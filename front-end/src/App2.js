import React, {Component} from 'react';

import NavBar from './containers/NavBar';
import ToDo from "./ToDo";

class AppTwo extends Component{

  render(){
    return(
      <div className={"to-do-app"}>
        <NavBar/>
        <ToDo/>
      </div>
    )
  }
}

export default AppTwo;