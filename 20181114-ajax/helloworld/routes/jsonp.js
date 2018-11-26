var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  var _callback = req.query.callback;
  var _data = [1,2,3,4,5];
  console.log(_callback)
  if (_callback){
      res.type('text/javascript');
      res.send(_callback + '(' + JSON.stringify(_data) + ')');
  }
  else{
      res.json(_data);
  }
});

module.exports = router;