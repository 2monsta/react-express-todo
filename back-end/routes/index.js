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


router.post("/addTask", (req, res,next)=>{
  console.log(req.body);
  const NEW_TASK = req.body.taskName;
  const TASK_DATE = req.body.taskDate;
  let insertIntoDB = new Promise((resolve, reject)=>{
    let query = 'insert into tasks (newTask, taskDate) values (?, ?);';
    connection.query(query, [NEW_TASK, TASK_DATE], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve({msg:"success"})
      }
    });
  });

  let getDataFromDB = new Promise((resolve, reject)=>{
    let selectQuery = "select * from tasks;";
    connection.query(selectQuery, (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    })
  });

  insertIntoDB
  .then((msg)=>{
    console.log(msg);
    return getDataFromDB;
  })
  .then((data)=>{
    res.json(data);
  })
  .catch((error)=>{
    console.log(error);
  })
});

router.get("/getTasks", (req,res,next)=>{
  let getDataFromDB = new Promise((resolve, reject)=>{
    let selectQuery = "select * from tasks;";
    connection.query(selectQuery, (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    })
  });

  getDataFromDB
  .then((data)=>{
    res.json(data);
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
  .then(()=>{
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


router.post("/deleteTask", (req, res, next)=>{
  const postID = req.body.taskID;
  let deleteFromDB = new Promise((resolve, reject)=>{
    let deleteQuery = "delete from tasks where id = ?;";
    connection.query(deleteQuery, [postID], (error)=>{
      if(error){
        reject(error);
      }else{
        resolve({msg:"success"})
      }
    })
  });

  let getDataFromDB = new Promise((resolve, reject)=>{
    let selectQuery = "select * from tasks;";
    connection.query(selectQuery, (error, results)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    })
  });

  deleteFromDB
  .then((data)=>{
    return getDataFromDB;
  })
  .then((data)=>{
    res.json(data);
  })


});

module.exports = router;
