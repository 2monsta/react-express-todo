var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getStudents', function(req, res, next) {
  const students = [
    "eddie",
    "valerie",
    "michael",
    "scott"
  ];

  res.json(students);
});

module.exports = router;
