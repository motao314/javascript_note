// import { read } from 'fs';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var get = require('./routes/get');
var post = require('./routes/post');
var sleep = require('./routes/sleep');
var kuayu = require('./routes/kuayu');
var jsonp = require('./routes/jsonp');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/get', get);
app.use('/post',post);
app.use('/sleep',sleep);
app.use('/kuayu',kuayu);
app.use('/jsonp',jsonp);

const request = require('request');
// 配置静态文件服务中间件
let serverUrl='http://www.jd.com';//server地址
app.use('/daili', function(req, res) {
  let url = serverUrl + req.url;
  req.pipe(request(url)).pipe(res);
  console.log('1111111');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


 


app.listen(80,'127.0.0.1',function(){
  console.log('server is running at port 80');
});

module.exports = app;
