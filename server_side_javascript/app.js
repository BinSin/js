var express = require('express');
var app = express();
app.get('/', function(req, res) { // req(요청), res(응답) 약속!!
  res.send('Hello home page');
}); // 사용자가 /(home)으로 접속하면 function함수가 발생함
app.get('/login', function(req, res) { // get은 연결해주는 함수
  res.send('<h1>Login please</h1>');
})
app.listen(2999, function() {
  console.log('Connected 2999 port!');
});
// route : 길을 찾는다.
// router(= get()) : 사용자의 요청과 그 요청에 대한 처리인 controller를 중개해주는 역할
