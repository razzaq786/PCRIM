import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import HMSTests from '../abis/HMSTests.json'

const ipfsClient = require('ipfs-http-client') 
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0'}) // leaving out the arguments will default to these values

 
class Main extends Component {

  
    async componentWillMount() {
        await this.loadWeb3() 
        await this.loadBlockchainData()
        //alert(ReactSession.get("username")) 
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
        //console.log(DataLogic.abi)
        const networkId = await web3.eth.net.getId()
        const networkData = HMSTests.networks[networkId]
    
        if(networkData) {
          const dataLogic = web3.eth.Contract(HMSTests.abi, networkData.address)
          console.log(dataLogic)
          this.setState({ dataLogic })
          //const dataCount = await dataLogic.methods.dataUploadCount().call() 
          //this.setState({ dataCount })
        }else {
          window.alert('PCRIM Network contract not deployed to detected network.')
        }
    
      }



  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    document.getElementById("custom-file-id").innerHTML = event.target.files[0].name
    //alert(event.target.files[0].name)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  
  
  constructor(props) {
    super(props)
    this.state = {
      account: '', 
      dataCount: 0, 
      newGlobalVar: '' 
    }  
  }
  
 



    render() {
        return (
            <div id="content">
            <form onSubmit={(event) => {
                event.preventDefault()   
                var sm1, sm2;
                var func1 = performance.now();
                console.log(func1); 
                const userid = this.userid.value; 
                const userapid = this.userapid.value; 
                const description = this.descriptionid.value; 
                ipfs.add(this.state.buffer, (error, result) => {
                  console.log('Ipfs result', result)
                  if(error) {
                    console.error(error)
                    return
                  }
                   sm1 = performance.now();
                //this.props.AddImageCentric(userid, result[0].hash, description)
                this.state.dataLogic.methods.AddImageCentric(userid, userapid, description, result[0].hash ).send({ from: this.state.account }).then((r) => {
                    //return this.setState({ memeHash: result[0].hash })
                  })
                   sm2 = performance.now();
                   console.log("Only Smart Contract Execution-: " + sm2 +"---"+ sm1);
                })  
                var func2 = performance.now();
                console.log("Complete Function Execution: " + func2 +"---"+ func1);
            }
            }>
                
         <div className="auth-wrapper">
           <div className="auth-inner">
              <div className="row">
        
          <br/>
          <br/>
          <br/>
          <br/>
        <div className="col-12">  
           <label> MIR Upload</label> 
        <div id="testcornerid">
         
          <div className="form-group">
            <input
              id="userid"
              type="text"
              ref={(input) => { this.userid = input }}
              className="form-control"
              placeholder="User ID"
               />
          </div> 
          <div className="form-group">
            <input
              id="userapid"
              type="text"
              ref={(input) => { this.userapid = input }}
              className="form-control"
              placeholder="User Appointment ID"
               />
          </div> 
          <div className="form-group">
            <input
              id="descriptionid"
              type="textarea"
              ref={(input) => { this.descriptionid = input }}
              className="form-control"
              placeholder="Description of MIR Data"
               />
          </div>
        </div>
           </div>
           </div>
          <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">Upload MIR Data Package</span>
      </div>
      <div className="custom-file">
        <input type="file" className="custom-file-input" onChange={this.captureFile}/>
        <label className="custom-file-label" id="custom-file-id" >Choose file</label>
      </div>
    </div> 


    
           <button type="submit" className="btn btn-primary form-control">Upload Image</button>
           </div></div>
       
            </form>
            </div>
        );

    }
    // constructor(props) {
    //     super(props)
    //     this.state = { 
    //       newGlobalVar2: ''
    //     } 
    //   }
}
export default Main;