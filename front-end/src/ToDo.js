import React, {Component} from 'react';
import axios from 'axios';


class ToDo extends Component{
  constructor(){
    super();
    this.state={
      taskList: []
    };
    this.addNewTask= this.addNewTask.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }


  // ADD to table
  addNewTask(e){
    e.preventDefault();
    const TASK = document.getElementById("new-task").value;
    const TASK_DATE=document.getElementById("new-task-date").value;
    axios({
      method: "POST",
      url: "http://localhost:3000/addTask",
      data: {
        taskName: TASK,
        taskDate: TASK_DATE
      }
    })
      .then((taskData)=>{
        this.setState({
          taskList:taskData.data
        })
      })
  }


  //DELETE from table
  handleClick(id){
    axios({
      method: "POST",
      url: "http://localhost:3000/deleteTask",
      data:{
        taskID: id
      }
    })
      .then((data)=>{
        this.setState({
          taskList: data.data
        })
      })
  }

  //LOAD initial task
  componentDidMount(){
    axios({
      method: "GET",
      url: "http://localhost:3000/getTasks"
    })
      .then((currentTasks)=>{
        this.setState({
          taskList: currentTasks.data
        })
      });

  }
  render(){
    let taskArray = this.state.taskList.map((task, index)=>{
      return (
        <tr key={index}>
          <td>{task.newTask} - {task.taskDate}</td>
          <td><button onClick={()=>{this.handleClick(task.id)}} className={"btn red"}>Delete</button></td>
          <td><button className={"btn blue"}>Edit</button></td>
        </tr>
      )
    });
    return (
      <div>
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <h1 className="header center orange-text">To-Do List</h1>
            <div className="row center">
              <h5 className="header col s12 light">Made with MySQL, React/Redux and Express</h5>
            </div>
          </div>
        </div>
        <div className={"container"}>
          <form onSubmit={this.addNewTask} className={"add-box"}>
            <input type="text" id={"new-task"} placeholder={"New Task"}/>
            <input type="date" id={"new-task-date"}/>
            <button type={"submit"} className={"btn"}>Add Task</button>
          </form>
          <table className={"table table-bordered"}>
            <thead>
            <tr>
              <th>Task</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            </thead>
            <tbody>
              {taskArray}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default ToDo;