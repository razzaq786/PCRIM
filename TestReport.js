import React, { Component } from 'react';
import logo from '../logo.png';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3'
import HMSTests from '../abis/HMSTests.json'
//import Navbar from './Navbar'
//import Main from './Main'
import { ReactSession } from 'react-client-session'; 
import ReactDOM from 'react-dom';
 
class TestReport extends Component {

  async componentWillMount() {
    await this.loadWeb3()  
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

 

  async GetPatientReport() {
    //alert(ID);
    var func1 = performance.now();
    var apid = document.getElementById("appointmentId").value;
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts() 
    //alert(accounts)
    const networkId = await web3.eth.net.getId()
    const networkData = HMSTests.networks[networkId]
    const hmsTests = web3.eth.Contract(HMSTests.abi, networkData.address)
      console.log(hmsTests) 
      //const bloodtest = await hmsTests.methods.GetLipidTest_Id(apid).call()
      const lipidtest = await hmsTests.methods.GetLipidTest_Id(apid).call()
      //console.log(lipidtest)
      var notFound = lipidtest._defaultAccount 
      if(notFound === "undefined"){
        //alert(1)
      }else{
        //alert(2)
      } 
      const report = " Cholestrol HDL: " + lipidtest.cholestrolHDL +
                     "\n Cholestrol LDL: " + lipidtest.cholestrolLDL +
                     "\n Triglycerides: " + lipidtest.triglycerides +
                     "\n TotalCholestrol LDL-HDL ratio: " + lipidtest.totalCholestrolLDLHDLratio 
      var func2 = performance.now();
      console.log("Complete Function Execution: " + func2 +"---"+ func1);
      alert(report)
  }

  async GetPCRIMfile() {
    //alert(ID); 
    var func1 = performance.now();
    var apid = document.getElementById("appointmentId").value;
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts() 
    //alert(accounts)
    const networkId = await web3.eth.net.getId()
    const networkData = HMSTests.networks[networkId]
    const hmsTests = web3.eth.Contract(HMSTests.abi, networkData.address)
      console.log(hmsTests) 
      //const bloodtest = await hmsTests.methods.GetLipidTest_Id(apid).call()
      const imgmir = await hmsTests.methods.GetImageCentric_Id(apid).call()
      console.log(imgmir)
      var notFound = imgmir._defaultAccount 
      if(notFound === "undefined"){
        //alert(1)
      }else{
        //alert(2)
      }  
      //alert(imgmir.metadatahash)
      //window.location = 'https://ipfs.io/ipfs/'+imgmir.metadatahash;
      window.open('https://ipfs.io/ipfs/'+imgmir.metadatahash, '_blank');
      var func2 = performance.now();
      console.log("Complete Function Execution: " + func2 +"---"+ func1);
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '', 
      testCount: 0,
      GetBloodGroupingRh_Id: [], 
      newGlobalVar: ''
      //loading: true
    } 
  }

  render() {
    return ( 
      <div> 
        <form>
        <div className="auth-wrapper2">
            <div className="auth-inner2"> 
                <div className="form-group">
                    <h3 className="textcenter">Test Report | PCRIM File</h3>
                    <input
                    id="appointmentId"
                    type="text" 
                    className="form-control"
                    placeholder="Appointment Id"
                    required/>
                </div>
                <button type="button" className="btn btn-primary form-control" onClick={this.GetPatientReport}>See Report</button>
                <br/> <br/>
                <button type="button" className="btn btn-primary form-control" onClick={this.GetPCRIMfile}>Download PCRIM File</button> 
            </div>
            </div>
        </form>
    </div>

      
    );
  }
  
}
 


export default TestReport;
