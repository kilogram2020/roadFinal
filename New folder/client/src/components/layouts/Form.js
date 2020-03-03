//Road cutting form page
import React,{Component}from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Dashboard from './Dashboard';
var obj;
var nam =[];
var consumerCode ;
class Form extends Component{
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {//state storing all the elements of the form
      name: '',
      fatherName: '',
      mobile: '',
      email: '',
      applicantType:'',
      district:'',
      areaType:'',
      address1:'',
      address2:'',
      pincode: '',
      road_district:'',
      road_urban_local_body_name:'',
      road_ward_no:'',
      road_locality:'',
      road_cuttingReason:'',
      road_category:'',
      road_totalcost:'',
      error: null
    }
  }
  async handleFormSubmit( event ) {//function to send all the data entered by user to backend using api when user hits submit and redirecting user to payment page
    event.preventDefault();
    console.log('submitted');
    const { name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_district,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost} = this.state;
    const auth_token = this.props.auth_token;
    console.log(auth_token);
    console.log(consumerCode);
    console.log(this.props);
    const body = JSON.stringify({ name,fatherName,mobile,email,applicantType,district,areaType,address1,address2,pincode,road_district,road_urban_local_body_name,road_ward_no,road_locality,road_cuttingReason,road_category,road_totalcost,auth_token,consumerCode});
    console.log(body);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/profile/form', body, config);
      if(res.status===200){
        console.log("Succesfull");
        alert('Form submitted');
        console.log(res);
        this.props.history.push("/pay");
  }
  else{
    alert('Something has gone wrong')
  }
  } catch (error) {
      alert(error)
  }
  }

 async componentDidMount(){
    try {
      const bodyid = JSON.stringify({
        "auth_token": this.props.auth_tokenid
      });
      const configid = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const resid = await axios.post('form/idgen',bodyid,configid);
      console.log(resid);
      consumerCode = resid.data.idResponses[0].id;
      console.log(consumerCode);
      this.props.edit_consumCode(consumerCode);
    } catch (error) {
      alert(error)
    }
}

  render(){
    nam = this.props.nam;//getting list of districts got in login page
    return (
      <div>
        <Dashboard />{/* Side bar and top Menu */}
      <div className="App">
      <form>
      <br></br>
      {/* Below are all the inputs for user to enter or select from dropdown */}
        <h2>Road Cutting Form</h2><br></br>
        <p>Your General Information</p>
  <label>Applicants Name</label>
  <input type="text" id="name" name="name" placeholder="Your name.."
    value={this.state.name}
    onChange={e => this.setState({ name: e.target.value })}
  />
  <label>Father's/Husband's Name</label>
  <input type="text" id="fatherName" name="fatherName" placeholder="Your father's name.."
    value={this.state.fatherName}
    onChange={e => this.setState({ fatherName: e.target.value })}
  />
  <label>Mobile number</label>
  <input type="text" id="mobile" name="mobile" placeholder="Your mobile mobile.."
    value={this.state.mobile}
    onChange={e => this.setState({ mobile: e.target.value })}
  />
  <label>Your email</label>
  <input type="email" id="email" name="email" placeholder="Your email.."
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
  <input type="text" id="district" name="district" placeholder="Your district.."
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
  <input type="text" id="address1" name="address1" placeholder="Address line 1.."
    value={this.state.address1}
    onChange={e => this.setState({ address1: e.target.value })}
  />
  <br></br>
  <label>Address Line 2</label>
  <input type="text" id="address2" name="address2" placeholder="Address Line 2.."
    value={this.state.address2}
    onChange={e => this.setState({ address2: e.target.value })}
  />
  <label>Pin Code</label>
  <input type="text" id="pincode" name="pincode" placeholder="pin code .."
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
  <input type="text" id="road_locality" name="road_locality" placeholder="Locality/Street"
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
  <input type="text" id="road_totalcost" name="road_totalcost" placeholder="in Rs."
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
    auth_tokenid : state.auth_tokenid,
    nam :state.nam,
    consumCode : state.consumCode,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    edit_consumCode : (consumCode)=>{dispatch({type:'CONSUMCODEEDIT',consumCode:consumCode})},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form)