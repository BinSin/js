var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true; // jade 코드 이쁘게
app.set('view engine', 'pug');
app.set('views', './views'); // template 파일을 views 디렉토리에 저장

app.use(express.static('public')); // 정적인 파일 서비스
app.use(bodyParser.urlencoded({ extended: false })); // post방식의 데이터 사용 가능

app.get('/form', function(req, res) {
  res.render('form');
});

app.get('/form_receiver', function(req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + '.' + description);
});

app.post('/form_receiver',function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + '.' + description);
})

app.get('/topic', function(req, res) {
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...',
  ];
  var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">Nodej>s</a><br>
    <a href="/topic/2">Express</a><br>
    ${topics[req.query.id]}
  `
  res.send(output);
});

app.get('/topic/:id/:node', function(req, res){
  res.send(req.params.id + ', ' + req.params.node);
});

app.get('/template', function(req, res) {
  res.render('temp', {time: Date(), title: 'Pug'});
}); // template경로를 통해 들어온 사용자에게 웹페이지에 temp파일을 렌더링해서 전송한다.

app.get('/', function(req, res) { // req(요청), res(응답) 약속!!
  res.send('Hello home page');
}); // 사용자가 /(home)으로 접속하면 function함수가 발생함
app.get('/dynamic', function(req, res) {
  var lis = ' ';
  for(var i=0; i<5; i++) {
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
  // \로 여러줄을 쓸 수 있다. 그것보다 `가 더 편하다
  // ${변수}
});

app.get('/route',  function(req, res) {
  res.send('Hello Router, <img src="/route.png">');
});

app.get('/login', function(req, res) { // get은 연결해주는 함수
  res.send('<h1>Login please</h1>');
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});
// route : 길을 찾는다.
// router(= get()) : 사용자의 요청과 그 요청에 대한 처리인 controller를 중개해주는 역할
