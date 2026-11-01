const {test}=require('node:test');
const assert=require('node:assert/strict');
const RC=require('../record-correction.js');
const people=[
 {pid:'P123',sid:'S082',phone:'91234567',name:'Chan Tai Man'},
 {pid:'P124',sid:'S083',phone:'92345678',name:'陳小明'},
];
test('PID, SID, full phone or full name can each resolve the same participant',()=>{
 for(const query of ['p123','S082','9123 4567','+852 9123 4567','chan   tai man']){
  assert.equal(RC.resolvePerson(people,query).pid,'P123',query);
 }
 assert.equal(RC.resolvePerson(people,'陳小明').pid,'P124');
});
test('missing, partial and ambiguous identifiers cannot select a participant',()=>{
 for(const query of ['', 'Chan', '4567', 'S08','P999'])assert.throws(()=>RC.resolvePerson(people,query));
 for(const field of ['name','phone','sid']){
  const duplicate={...people[1],[field]:people[0][field]};
  assert.throws(()=>RC.resolvePerson([people[0],duplicate],people[0][field]),/多位/);
 }
 assert.throws(()=>RC.resolvePerson([{name:'Unassigned'}],'Unassigned'),/配對/);
});
