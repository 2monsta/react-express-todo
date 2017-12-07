var express = require('express');
var router = express.Router();
var mysql = require ("mysql");
var config = require("../config/config");

var connection = mysql.createConnection(config.db);

connection.connect();

/* GET home page. */
router.get('/getStudents', function(req, res, next) {

  const SELECT_QUERY = "select * from students;";
  const getStudents = new Promise((resolve, reject)=>{
    connection.query(SELECT_QUERY, (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    });
  });

  getStudents
    .then((results)=>{
      res.json(results)
  })
});


router.post("/addStudent", (req, res,next)=>{
  const STUDENT_NAME = req.body.studentName;
  const INSERT_QUERY = 'insert into students (name) values (?);';
  let insertName = new Promise((resolve, reject)=>{
    connection.query(INSERT_QUERY,[STUDENT_NAME], (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve({msg:"success"});
      }
    })
  });
  let getData = new Promise((resolve, reject)=>{
    const QUERY = "select * from students;";
    connection.query(QUERY, (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    })
  });

  insertName
  .then((data)=>{
    return getData;
  })
  .then((data)=>{
    console.log(data);
    res.json(data);
  })
  .catch((error)=>{
    console.log(error);
  });
});

module.exports = router;
