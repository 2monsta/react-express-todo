import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state= {
      students:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3000/getStudents')
    .then((response)=>{
      console.log(response);
      this.setState({
        students: response.data
      })
    })
  }

  // we want to send student name to the server, we cannot use get. WE NEED TO USE POST
  // THERES is axios .post and there is axios ({})
  // AXIOS always return a promise, so we will send data to the express server, and wait for a json response when we get it,
  // we will move forward
  handleSubmit(e){
    e.preventDefault();
    const STUDENT_NAME = document.getElementById("new-student").value;
    axios({
      method: "POST",
      url: "http://localhost:3000/addStudent",
      data: {
        studentName: STUDENT_NAME
      }
    })
    .then((data)=>{
      console.log(data);
      this.setState({
        students:data.data
      });
    });
  }
  render() {
    let studentsArray = this.state.students.map((student, index)=>(
        <li key={index}>{student.name}</li>
      )
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id={"new-student"} placeholder={"New Student Name"}/>
          <button type={"submit"}>Add Student</button>
        </form>
        <ul>
          {studentsArray}
        </ul>
      </div>
    );
  }
}

export default App;
