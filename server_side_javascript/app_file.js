var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // callback 함수
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: _storage }); // uploads/ : 저장될 장소
var fs = require('fs'); // 파일 시스템 모듈 가져오기
var app = express();
app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');
app.get('/upload', function(req, res){
  res.render('upload');
})
app.post('/upload', upload.single('userfile'),function(req, res){ //single('userfile') : req 객체 안에 file property(사용자가 전송한 파일 정보)를 넣어준다.
  res.send('Uploaded : '  + req.file.filename);
})
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){ // /files : data 안의 파일들이 배열로 담김
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics: files});
  });
});
app.get(['/topic', '/topic/:id'], function(req, res){ // 배열로 url 담음
  fs.readdir('data', function(err, files){ // /files : data 안의 파일들이 배열로 담김
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    // id 값이 있을 때
    if(id) {
      fs.readFile('data/' + id, 'utf8', function(err, data) {
        if(err){
          console.log(err);
          res.status(500).send('Internal Serval Error');
        }
        res.render('view', {topics: files, title: id, description: data});
      });
    }
    // id 값이 없을 때
    else {
      res.render('view', {topics: files, title: 'Welcome', description: 'Hello, JavaScript for server.'}); // 주입하고자 하는 내용을 객체에 전달
    }
  });
});
/*
app.get('/topic/:id', function(req, res) { // 바뀔 수 있는 정보 : 로 표시
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/' + id, 'utf8', function(err, data) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Serval Error');
      }
      res.render('view', {topics: files, title: id, description: data});
    });
  });
});
*/
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err); // 상세한 에러를 사용자에게 알려주면 위험하다(해킹에 위험).
      res.status(500).send('Internal Server Error'); // 오류를 기계들에게 알려줌
    }
    res.redirect('/topic/'+title); // 이 url로 사용자를 보내버린다.
  });
});
app.listen(3000, function(){
  console.log('Connected, 3000 port~!');
});
