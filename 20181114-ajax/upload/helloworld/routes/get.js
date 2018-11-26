var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
  
*/
let person = [
  'dudu',
  '虫虫',
  'yellow',
  '小水晶',
  '小时候可瘦了'
];

router.get('/', function(req, res, next) {
  let obj = {
    code:0,
    msg:'有介个银了啦!'
  }
  let json = req.query;
  console.log(person.includes(json.name))
  if(!person.includes(json.name)){
      obj.code = 1;
      obj.msg = '没有介个银!';
  }
  res.send(JSON.stringify(obj));
});

module.exports = router;
