import React, { Component } from 'react';
import logo from '../logo.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3'
import HMSTests from '../abis/HMSTests.json'
import Navbar from './Navbar'
import Main from './Main'
import { ReactSession } from 'react-client-session';
import Login from "./Login.js";
import AddTestReport from "./AddTestReport.js";
import TestReport from "./TestReport.js";
import Radiologist from "./Radiologist.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {

  
 

  render() {
     
    return (
      <Router> 
          <Switch> 
            <Route  path='/' exact component={Login} />
            <Route path="/login" component={Login} /> 
            <Route path="/addTestReport" component={AddTestReport} /> 
            <Route path="/testReport" component={TestReport} /> 
            <Route path="/radiologist" component={Radiologist} /> 
          </Switch> 
      </Router>
    );
  }
  
}
 


export default App;
