param(
  [Parameter(Mandatory=$true)][string]$LiveDir,
  [Parameter(Mandatory=$true)][string]$CandidateDir
)

$ErrorActionPreference = 'Stop'

function Get-Inventory([string]$Root) {
  $resolved = (Resolve-Path -LiteralPath $Root).Path
  $items = @{}
  Get-ChildItem -LiteralPath $resolved -File -Recurse |
    Where-Object { $_.Extension -in '.js', '.json', '.html' } |
    ForEach-Object {
      $relative = $_.FullName.Substring($resolved.Length).TrimStart('\','/').Replace('\','/')
      $items[$relative] = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
    }
  return $items
}

$live = Get-Inventory $LiveDir
$candidate = Get-Inventory $CandidateDir
$names = @($live.Keys + $candidate.Keys | Sort-Object -Unique)
$rows = foreach ($name in $names) {
  $inLive = $live.ContainsKey($name)
  $inCandidate = $candidate.ContainsKey($name)
  $status = if (!$inLive) {'CANDIDATE_ONLY'} elseif (!$inCandidate) {'LIVE_ONLY'} elseif ($live[$name] -eq $candidate[$name]) {'SAME'} else {'DIFFERENT'}
  [pscustomobject]@{File=$name; Status=$status; LiveSHA256=if($inLive){$live[$name]}else{''}; CandidateSHA256=if($inCandidate){$candidate[$name]}else{''}}
}

$rows | Format-Table -AutoSize
$counts = $rows | Group-Object Status | Sort-Object Name | ForEach-Object { "$($_.Name)=$($_.Count)" }
Write-Host ('SUMMARY ' + ($counts -join ' '))
