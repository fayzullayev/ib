import React, { Component } from 'react';
import { BrowserRouter as Router, Route,NavLink, Switch,Redirect } from "react-router-dom";
//import Cards from "../../Components/Main/Cards/Cards"; 
//import Deposit from "../../Components/Main/Deposit/Deposit"; 
//import Transfer from "../../Components/Main/Transfer/Transfer";


class Home extends Component {
  

  render () {
    //let currentPath = this.props.match.url;
     return (
      <div >
      <h2>I am Home</h2>
      </div>
  );
  }
};
export default Home;