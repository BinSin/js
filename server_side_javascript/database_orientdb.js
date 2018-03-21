var OrientDB = require('orientjs');

var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'password'
});
var db = server.use('o22')
/*
// Mysql에서 key가 여기선 rid
var rec = db.record.get('#9:0')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );
*/

// CRUD

/*
// Create
var topic = db.create('VERTEX', 'V')
   .set({
      title:  '12',
      description: '12345',
   }).one().then(
      function(topic){
         console.log('Created Vertex: ' + topic.title);
      }
   );
// 문제가 있음 -> 테이블 새롭게 추가 안되고 기존에 추가만 됌.
*/

/*
// Insert
db.insert().into('topic')
   .set({
     title: 'Java',
     description:    'Express is framwork for web.'
   }).one().then(function(player){
      console.log(player)
   });
*/

/*
// Update
db.update('#10:1')
   .set({
      description: '123'
   }).one()
   .then(
      function(update){
         console.log('Records Updated:', update);
      }
   );
*/

/*
// Delete
db.delete('VERTEX','V')
   .where('@rid = #10:1').one()
   .then(
      function(del){
         console.log('Records Deleted: ' + del);
      }
   );
*/
