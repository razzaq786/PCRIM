import React, { Component } from "react";
import { ReactSession } from 'react-client-session';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import  { Redirect } from 'react-router';
//import AddTestReport from "./AddTestReport.js";

export default class Login extends Component {
      
    render() {
        return ( 
            <form onSubmit={(event) =>{
                event.preventDefault()
                const email = this.email.value  
                const password = this.password.value
                    if(email=="lab" && password == 123)
                    {
                        ReactSession.set("authentication", "OK");
                        this.props.history.push("/AddTestReport");
                    }
                    else if (email=="patient" && password == 123)
                    {
                        //this.props.history.push("/Patient");
                    }
                    else if (email=="doctor" && password == 123)
                    {
                        this.props.history.push("/TestReport"); //to see patient reports
                    }
                    else
                    { 
                        ReactSession.set("authentication", "NO");
                        alert("Authentication failed...")
                    }
                    //alert(ReactSession.get("authentication"))
                }}>
        <div className="auth-wrapper2">
        <div className="auth-inner2">
                <h3 className="textcenter">Sign In</h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" placeholder="User Name" ref={(input) => { this.email = input }} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={(input) => { this.password = input }}/>
                </div>
  
                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
            </div>
            </div>
            </form>
        );
    }
}