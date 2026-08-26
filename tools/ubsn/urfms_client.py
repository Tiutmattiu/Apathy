from __future__ import annotations

import logging
import os
import time
from datetime import datetime
from pathlib import Path

LOGIN_URL = "https://urfms.polyu.edu.hk/users/saml/sign_in"
BOOKING_URL = "https://urfms.polyu.edu.hk/facilities/ubsn/instruments/human_MRI/single_reservations/new"
RESERVATIONS_URL = "https://urfms.polyu.edu.hk/facilities/ubsn/instruments/human_MRI/reservations.js"


class URFMSClient:
    """Persistent visible Playwright session; final submission is deliberately absent."""

    def __init__(self, config: dict):
        self.config = config; self.playwright = self.context = self.page = None

    def start(self) -> None:
        from playwright.sync_api import sync_playwright
        self.playwright = sync_playwright().start()
        profile = Path(self.config.get("profile_dir", ".local/browser-profile")).resolve(); profile.mkdir(parents=True, exist_ok=True)
        self.context = self.playwright.chromium.launch_persistent_context(str(profile), headless=False, slow_mo=self.config.get("slow_mo", 50))
        self.page = self.context.pages[0] if self.context.pages else self.context.new_page()

    def close(self) -> None:
        if self.context: self.context.close()
        if self.playwright: self.playwright.stop()

    def debug_screenshot(self, label="error") -> Path | None:
        if not self.page: return None
        folder=Path(self.config.get("screenshot_dir", ".local/screenshots"));folder.mkdir(parents=True,exist_ok=True)
        path=folder/f"{label}-{datetime.now().strftime('%Y%m%d-%H%M%S')}.png"
        self.page.screenshot(path=str(path),full_page=True);logging.info("Saved local debug screenshot: %s",path.resolve());return path.resolve()

    def ensure_authenticated(self) -> None:
        self.page.goto(BOOKING_URL, wait_until="domcontentloaded")
        if self.page.locator("#order_account").count(): return
        self.page.goto(LOGIN_URL, wait_until="domcontentloaded")
        net_id, password = os.getenv("URFMS_NET_ID"), os.getenv("URFMS_PASSWORD")
        if net_id and password and self.page.locator("#userNameInput").count():
            self.page.fill("#userNameInput", net_id); self.page.fill("#passwordInput", password); self.page.click("#submitButton")
        logging.info("Complete SAML/verification in the visible browser; waiting for booking access")
        deadline = time.time() + self.config.get("manual_login_timeout_seconds", 300)
        while time.time() < deadline:
            row = self.page.locator(f"tr:has-text('{self.config['assistant']}')")
            if row.count():
                row.locator("a:has-text('Select')").first.click(); self.page.wait_for_load_state("domcontentloaded")
            self.page.goto(BOOKING_URL, wait_until="domcontentloaded")
            if self.page.locator("#order_account").count(): return
            time.sleep(3)
        raise TimeoutError("manual SAML login did not reach the booking page")

    def select_assistant_if_needed(self) -> None:
        name = self.config["assistant"]
        row = self.page.locator(f"tr:has-text('{name}')")
        if row.count():
            row.locator("a:has-text('Select')").first.click(); self.page.wait_for_load_state("domcontentloaded")

    def request_calendar(self, start: datetime, end: datetime) -> str:
        self.ensure_authenticated()
        response = self.context.request.get(RESERVATIONS_URL, params={"with_details": "false", "start": start.isoformat(), "end": end.isoformat()})
        if response.status in (401, 403) or "sign_in" in response.url:
            self.ensure_authenticated(); response = self.context.request.get(RESERVATIONS_URL, params={"with_details": "false", "start": start.isoformat(), "end": end.isoformat()})
        if not response.ok: raise RuntimeError(f"reservations.js returned HTTP {response.status}")
        return response.text()

    def capture(self, start: datetime, end: datetime, output_dir="captures") -> Path:
        raw = self.request_calendar(start, end); folder = Path(output_dir); folder.mkdir(parents=True, exist_ok=True)
        path = folder / f"reservations-{datetime.now().strftime('%Y%m%d-%H%M%S')}.txt"
        path.write_text(raw, encoding="utf-8")
        logging.info("Saved response body only (no headers/cookies/tokens): %s", path.resolve())
        return path.resolve()

    def prepare_booking(self, slot, *, dry_run=False) -> None:
        self.ensure_authenticated(); self.select_assistant_if_needed(); self.page.goto(BOOKING_URL, wait_until="domcontentloaded")
        self.page.select_option("#order_account", value=str(self.config["payment"]))
        self.page.fill("#reservation_note", str(self.config["project"]))
        day = slot.start.strftime("%d %b %Y")
        self.page.fill("#reservation_reserve_start_date", day); self.page.fill("#reservation_reserve_end_date", day)
        for prefix, value in (("start", slot.start), ("end", slot.end)):
            self.page.select_option(f"#reservation_reserve_{prefix}_hour", label=value.strftime("%I").lstrip("0"))
            self.page.select_option(f"#reservation_reserve_{prefix}_min", label=value.strftime("%M"))
            self.page.select_option(f"#reservation_reserve_{prefix}_meridian", label=value.strftime("%p"))
        if not dry_run:
            self.page.click("#confirm_reservation"); self.page.wait_for_load_state("domcontentloaded")
        logging.warning("Browser left visible for human CAPTCHA and final confirmation")
