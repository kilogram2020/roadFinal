import React,{Component}from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './../../App.css';
import Dashboard from './Dashboard';
var obj;
var nam =[];


class editForm extends Component{
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      name: this.props.formdata.name,
      fatherName: this.props.formdata.fatherName,
      mobile: this.props.formdata.mobile,
      email: this.props.formdata.email,
      applicantType:this.props.formdata.applicantType,
      district:this.props.formdata.district,
      areaType:this.props.formdata.areaType,
      address1:this.props.formdata.address1,
      address2:this.props.formdata.address2,
      pincode: this.props.formdata.pincode,
      road_district:this.props.formdata.road_district,
      road_urban_local_body_name:this.props.formdata.road_urban_local_body_name,
      road_ward_no:this.props.formdata.road_ward_no,
      road_locality:this.props.formdata.road_locality,
      road_cuttingReason:this.props.formdata.road_cuttingReason,
      road_category:this.props.formdata.road_category,
      road_totalcost:this.props.formdata.road_totalcost,
      error: null
    }
    const auth_token = this.props.auth_token;
    console.log(auth_token);
  }
  async handleFormSubmit( event ) {
    event.preventDefault();
    console.log('submitted');
    const { name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_district,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost} = this.state;
    const userid = this.props.formdata._id;
    console.log(userid);
    const body = JSON.stringify({ userid,name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_district,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost});
    console.log(body);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
        const res = await axios.post('/form/update', body, config);
       if(res.status===200){
         console.log("Succesfull");
         alert('Form submitted');
         console.log(res);
   }
   } catch (error) {
       alert(error)
   }
  }

  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json;charset=UTF-8");
    var raw = "{\"RequestInfo\":{\"apiId\":\"Rainmaker\",\"ver\":\".01\",\"ts\":\"\",\"action\":\"_search\",\"did\":\"1\",\"key\":\"\",\"msgId\":\"20170310130900|hi_IN\",\"authToken\":null},\"MdmsCriteria\":{\"tenantId\":\"uk\",\"moduleDetails\":[{\"moduleName\":\"common-masters\",\"masterDetails\":[{\"name\":\"Department\"},{\"name\":\"Designation\"},{\"name\":\"StateInfo\"}]},{\"moduleName\":\"tenant\",\"masterDetails\":[{\"name\":\"tenants\"},{\"name\":\"citymodule\"}]}]}}";
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://uttarakhand-dev.egovernments.org/egov-mdms-service/v1/_search?tenantId=uk", requestOptions)
      .then(response => response.text())
      .then(result => {
  obj=JSON.parse(result);
  for (let i =0;i<7;i++){
    nam.push({id:i,city : obj.MdmsRes.tenant.tenants[i].name});
  }
   console.log(nam);
  this.setState({datat:obj});

})
    .catch(error => console.log('error', error));
  // event.preventDefault();
}

  render(){
    return (
      <div>
          <Dashboard />
      <div className="App">
      {/* <formaction="#" > */}
      <form>
        <br></br>
        <h2>Road Cutting Form</h2><br></br>
        <p>Your General Information</p>
  <label>Applicants Name</label>
  <input type="text" id="name" name="name" 
    value={this.state.name}
    onChange={e => this.setState({ name: e.target.value })}
  />
  <label>Father's/Husband's Name</label>
  <input type="text" id="fatherName" name="fatherName"
    value={this.state.fatherName}
    onChange={e => this.setState({ fatherName: e.target.value })}
  />
  <label>Mobile number</label>
  <input type="text" id="mobile" name="mobile" 
    value={this.state.mobile}
    onChange={e => this.setState({ mobile: e.target.value })}
  />
  <label>Your email</label>
  <input type="email" id="email" name="email" 
    value={this.state.email}
    onChange={e => this.setState({ email: e.target.value })}
  />
  <label>Applicant type</label>
  <select value={this.state.applicantType}
    onChange={e => this.setState({ applicantType: e.target.value })}>
    <option value="">select</option>
    <option value="type1">type1</option>
    <option value="type2">type2</option>
    <option value="type3">type3</option>
    <option value="type4">type4</option>
  </select>
  <p>Applicants Address</p>
  <label>District</label>
  <input type="text" id="district" name="district" 
    value={this.state.district}
    onChange={e => this.setState({ district: e.target.value })}
  />
  <label>Area Type</label>
  <select value={this.state.areaType}
    onChange={e => this.setState({ areaType: e.target.value })}>
    <option value="">select</option>
    <option value="Urban">Urban</option>
    <option value="Rural">Rural</option>
  </select>
  <label>Address Line 1</label>
  <input type="text" id="address1" name="address1" 
    value={this.state.address1}
    onChange={e => this.setState({ address1: e.target.value })}
  />
  <br></br>
  <label>Address Line 2</label>
  <input type="text" id="address2" name="address2" 
    value={this.state.address2}
    onChange={e => this.setState({ address2: e.target.value })}
  />
  <label>Pin Code</label>
  <input type="text" id="pincode" name="pincode" 
  
    value={this.state.pincode}
    onChange={e => this.setState({ pincode: e.target.value })}
  />
  <p>Location of the Road/Street</p>
    <label>District</label>
    <select onChange={e => this.setState({ road_district: e.target.value })}>
            {nam.map(item => (
              <option key={item.id} value={item.city}>


                {item.city}
              </option>
            ))}
          </select>
  <label>Urban Local Body Name</label>
  <select value={this.state.road_urban_local_body_name}
    onChange={e => this.setState({ road_urban_local_body_name: e.target.value })}>
    <option value="">select</option>
    <option value="type1">type1</option>
    <option value="type2">type2</option>
    <option value="type3">type3</option>
    <option value="type4">type4</option>
  </select>
  <label>Ward Number</label>
  <select value={this.state.road_ward_no}
    onChange={e => this.setState({ road_ward_no: e.target.value })}>
    <option value="">select ward mobile</option>
    <option value="type1">type1</option>
    <option value="type2">type2</option>
    <option value="type3">type3</option>
    <option value="type4">type4</option>
  </select>
  <label>Locality/Street</label>
  <input type="text" id="road_locality" name="road_locality" 
    value={this.state.road_locality}
    onChange={e => this.setState({ road_locality: e.target.value })}
  />
  <label>Reason for road cutting</label>
  <select value={this.state.road_cuttingReason}
    onChange={e => this.setState({ road_cuttingReason: e.target.value })}>
    <option value="">select type of work</option>
    <option value="type1">type1</option>
    <option value="type2">type2</option>
    <option value="type3">type3</option>
    <option value="type4">type4</option>
  </select>
  <p>Detail of Right of Way/Road Cutting/Road Digging</p>
  <label>Category of Road</label>
  <select value={this.state.road_category}
    onChange={e => this.setState({ road_category: e.target.value })}>
    <option value="">select work type</option>
    <option value="Sewer Line">Sewer Line</option>
    <option value="Jai Shanthan">Jai Shanthan</option>
    <option value="Right of way">Right of way</option>
  </select><br></br>
  <label>Cost in Rs.</label>
  <input type="text" id="road_totalcost" name="road_totalcost" 
    value={this.state.road_totalcost}
    onChange={e => this.setState({ road_totalcost: e.target.value })}></input>
    <br></br>
    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
</form >
    </div>
    </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    user:state.user,
    password:state.password,
    auth_token:state.auth_token,
    formdata:state.formdata,
  }
}
export default connect(mapStateToProps)(editForm)