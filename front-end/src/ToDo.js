import React, {Component} from 'react';
import NavBar from './NavBar';

class ToDo extends Component{
  render(){
    return(
      <div className={"to-do-app"}>
        <NavBar />
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <h1 className="header center orange-text">To-Do List</h1>
            <div className="row center">
              <h5 className="header col s12 light">Made with React and Express</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ToDo;