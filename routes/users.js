var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Robots' });
});

module.exports = router;
