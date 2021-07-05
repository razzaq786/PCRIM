import React, { Component } from 'react';
import { ReactSession } from 'react-client-session';

class Main extends Component {
   
  async componentWillMount() {
    ReactSession.set("username", "Abdul Razzaq");
  }
    
 
  render() {
    return (
      <div id="content">
          
        <form onSubmit={(event) => {
          event.preventDefault()  
        //   const name = this.productName.value
        //   const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
        //   this.props.createProduct(name, price)
        var testtypeid = document.getElementById("testtypeid");
        var testtypevalue = testtypeid.options[testtypeid.selectedIndex].value;
        this.setState({ newGlobalVar2: 'testtypevalue' })
        //alert(this.state.newGlobalVar2)
        if(testtypevalue==2){
            const prescription_id2 = this.prescription_id2.value  
            const cholestrolHDL = this.cholestrolHDL.value  
            const cholestrolLDL = this.cholestrolLDL.value  
            const triglycerides = this.triglycerides.value  
            const totalCholestrolLDLHDLratio = this.totalCholestrolLDLHDLratio.value
            const appointment_id2 = this.appointment_id2.value
            this.props.AddLipidTest('userid-002', prescription_id2, cholestrolHDL, cholestrolLDL, triglycerides, totalCholestrolLDLHDLratio, appointment_id2)
        } else if(testtypevalue == 1){
            const prescription_id = this.prescription_id.value 
            var bloodlistid = document.getElementById("bloodgrouplistid");
            var bloodgroupvalue = bloodlistid.options[bloodlistid.selectedIndex].text;
            const rhesusD = this.rhesusD.value
            const appointment_id = this.appointment_id.value
            this.props.AddBloodGroupingRh('userid-001', prescription_id, bloodgroupvalue, rhesusD, appointment_id)
        }else{
          alert("Select Test Type for Blood or Lipid only...")
        }

        }}>


         <div className="auth-wrapper">
           <div className="auth-inner">
            
           <div className="form-group"> 
           <h2 className="textcenter">Add Test Report</h2>
          <select id="testtypeid" className="form-control">
              <option value="0">Select Test Type... </option>
              <option value="1">Blood Test </option>
              <option value="2">Lipid Test </option>
              <option value="3">Renal Function Test </option>
              <option value="4">Liver Function Test </option> 
              <option value="5">Serium Creatine Phosphokinase </option> 
          </select>
        </div>  <div className="row">
        <div className="col-6">       
        <label> Add Blood Test Report</label>
        <div id="bloodtestcornerid">
          <div className="form-group">
            <input
              id="prescription_id"
              type="text"
              ref={(input) => { this.prescription_id = input }}
              className="form-control"
              placeholder="Prescription Id"
               />
          </div>
          <div className="form-group">
          
          <select id="bloodgrouplistid" className="form-control">
              <option value="0">Select Blood Group Type... </option>
              <option value="a">A </option>
              <option value="b">B </option>
              <option value="o">O </option>
              <option value="ab">AB </option> 
          </select>
          </div>
          <div className="form-group">
            <input
              id="rhesusD"
              type="text"
              ref={(input) => { this.rhesusD = input }}
              className="form-control"
              placeholder="RhesusD"
               />
          </div>
          <div className="form-group">
            <input
              id="appointment_id"
              type="text"
              ref={(input) => { this.appointment_id = input }}
              className="form-control"
              placeholder="Appointment Id"
               />
          </div>
        </div>
           </div>
          
        <div className="col-6"> 
           <label> Add Lipid Test Report</label>
              {/* ----------------Lipid Test Section------------------ */}
        <div id="lipidtestcornerid">
        <div className="form-group">
            <input
              id="prescription_id2"
              type="text"
              ref={(input) => { this.prescription_id2 = input }}
              className="form-control"
              placeholder="Prescription Id"
               />
          </div>
          <div className="form-group">
            <input
              id="cholestrolHDL"
              type="text"
              ref={(input) => { this.cholestrolHDL = input }}
              className="form-control"
              placeholder="Cholestrol HDL"
               />
          </div>
          <div className="form-group">
            <input
              id="cholestrolLDL"
              type="text"
              ref={(input) => { this.cholestrolLDL = input }}
              className="form-control"
              placeholder="Cholestrol LDL"
               />
          </div>
          <div className="form-group">
            <input
              id="triglycerides"
              type="text"
              ref={(input) => { this.triglycerides = input }}
              className="form-control"
              placeholder="Triglycerides"
               />
          </div>
          <div className="form-group">
            <input
              id="totalCholestrolLDLHDLratio"
              type="text"
              ref={(input) => { this.totalCholestrolLDLHDLratio = input }}
              className="form-control"
              placeholder="Total Cholestrol LDL-HDL ratio"
               />
          </div>
          <div className="form-group">
            <input
              id="appointment_id2"
              type="text"
              ref={(input) => { this.appointment_id2 = input }}
              className="form-control"
              placeholder="Appointment Id"
               />
          </div>
        </div>
           </div>
           </div>
           
           <button type="submit" className="btn btn-primary form-control">Add Report</button>
           </div></div>
       

          
        </form>
        <p>&nbsp;</p>
        
      </div>
      
    );
  }

  constructor(props) {
    super(props)
    this.state = { 
      newGlobalVar2: ''
    } 
  }
}

export default Main;
 