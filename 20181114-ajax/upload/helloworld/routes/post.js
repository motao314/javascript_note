var express = require('express');
var router = express.Router();

/* GET users listing. */

let person = [
  'chaoxue',
  'yangna',
  'jquery',
  '你真胖',
  'momo'
];

router.post('/', function(req, res, next) {
  let u = 'name';
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.body;
  if(!person.includes(json[u])){
      res.send('{"code":1,"msg":"木有介个银!"}');
  }else{
    res.send('{"code":0,"msg":"有介个银!"}');
  }
});

module.exports = router;
