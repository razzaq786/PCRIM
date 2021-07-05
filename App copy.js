import React, { Component } from 'react';
import logo from '../logo.png';
//import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3'
import HMSTests from '../abis/HMSTests.json'
import Navbar from './Navbar'
import Main from './Main'
import { ReactSession } from 'react-client-session';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3() 
    await this.loadBlockchainData()
    alert(ReactSession.get("username")) 
       
  }

  async loadWeb3() {
    //this.setState({ newGlobalVar: 'testing phase for making Global variable' })
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

  async loadBlockchainData(){
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
       
      //console.log(HMSTests.abi)

      const networkId = await web3.eth.net.getId()
    const networkData = HMSTests.networks[networkId]
    //console.log(networkData)
    if(networkData) {
      const hmsTests = web3.eth.Contract(HMSTests.abi, networkData.address)
      console.log(hmsTests)
      this.setState({ hmsTests })
      const testCount = await hmsTests.methods.testCount().call()
      const lipidtestCount = await hmsTests.methods.lipidtestCount().call()
      const bloodtestCount = await hmsTests.methods.bloodtestCount().call()
      this.setState({ testCount })
      //console.log("getting total counts:"+testCount)
      // Load Test Reports
      //alert(this.state.newGlobalVar2)
      if(1 == 0){
        const lipidtest = await hmsTests.methods.GetLipidTest_Id(22).call()
        console.log(lipidtest)
        this.setState({
          GetLipidTest_Id: [...this.state.GetLipidTest_Id, lipidtest]
        })
          for (var i = 1; i <= lipidtestCount; i++) {
            const lipidtestCount1 = await hmsTests.methods.GetLipidTestList(i).call()
            console.log(lipidtestCount1)
            this.setState({
              GetLipidTestList: [...this.state.GetLipidTestList, lipidtestCount1]
            })
          } 
      } else{
        const bloodtest = await hmsTests.methods.GetBloodGroupingRh_Id(1).call()
            console.log(bloodtest)
            this.setState({
              GetBloodGroupingRh_Id: [...this.state.GetBloodGroupingRh_Id, bloodtest]
            })
          for (var i = 1; i <= bloodtestCount; i++) {
            const bloodtestCount2 = await hmsTests.methods.GetBloodGroupingRhList(i).call()
            console.log(bloodtestCount2)
            this.setState({
              GetBloodGroupingRhList: [...this.state.GetBloodGroupingRhList, bloodtestCount2]
            })
          } 
      }
    } else {
      window.alert('HMS Network contract not deployed to detected network.')
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '', 
      testCount: 0,
      GetBloodGroupingRh_Id: [],
      GetLipidTest_Id: [],
      GetLipidTestList: [],
      GetBloodGroupingRhList: [],
      newGlobalVar: ''
      //loading: true
    }
    this.AddBloodGroupingRh = this.AddBloodGroupingRh.bind(this)
    this.AddLipidTest = this.AddLipidTest.bind(this)
  }


  AddBloodGroupingRh(patientUserId, prescription_id, bloodGroup, rhesusD, appointment_id) {
    this.setState({ loading: true })
    this.state.hmsTests.methods.AddBloodGroupingRh(patientUserId, prescription_id, bloodGroup, rhesusD, appointment_id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     this.setState({ loading: false })
    })
  }

  AddLipidTest(patientUserId, prescription_id, cholestrolHDL, 
    cholestrolLDL, triglycerides, totalCholestrolLDLHDLratio, appointment_id) {
    this.setState({ loading: true })
    this.state.hmsTests.methods.AddLipidTest(patientUserId, prescription_id, cholestrolHDL, 
      cholestrolLDL, triglycerides, totalCholestrolLDLHDLratio, appointment_id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
     this.setState({ loading: false })
    })
  }


  render() {
    return ( 
      <div>
      <Navbar account={this.state.account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
          
             { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <Main
              GetLipidTest_Id={this.state.GetLipidTest_Id}
              GetBloodGroupingRh_Id={this.state.GetBloodGroupingRh_Id}
              AddLipidTest={this.AddLipidTest}
              AddBloodGroupingRh={this.AddBloodGroupingRh}
                />
            } 
          </main>
        </div>
      </div>
      
    </div>

      
    );
  }
  
}
 


export default App;
