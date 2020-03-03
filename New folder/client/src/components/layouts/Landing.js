//Login Page
import React,{Component}from 'react';
import {connect} from 'react-redux';//import redux
import axios from 'axios';
var obj;
var nam =[];
class Landing extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);//binds function to make it usable in render using this
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlechange = this.handlechange.bind(this);
      this.handlechang = this.handlechang.bind(this);
      this.state = {
        dist:"",
      }
    }

    componentDidMount(){//To get the district list from database using api calls as soon as component displays
      var myHeaders1 = new Headers();
      myHeaders1.append("authority", "uttarakhand-dev.egovernments.org");
      myHeaders1.append("accept", "application/json, text/plain, */*");
      myHeaders1.append("origin", "https://uttarakhand-dev.egovernments.org");
      myHeaders1.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36");
      myHeaders1.append("content-type", "application/json;charset=UTF-8");
      myHeaders1.append("sec-fetch-site", "same-origin");
      myHeaders1.append("sec-fetch-mode", "cors");
      myHeaders1.append("referer", "https://uttarakhand-dev.egovernments.org/employee/language-selection");
      myHeaders1.append("accept-encoding", "gzip, deflate, br");
      myHeaders1.append("accept-language", "en-US,en;q=0.9");
      myHeaders1.append("cookie", "_ga=GA1.2.901079459.1578893683; _gid=GA1.2.2000644538.1580966230");

      var raw1 = "{\"RequestInfo\":{\"apiId\":\"Rainmaker\",\"ver\":\".01\",\"ts\":\"\",\"action\":\"_search\",\"did\":\"1\",\"key\":\"\",\"msgId\":\"20170310130900|hi_IN\",\"authToken\":null},\"MdmsCriteria\":{\"tenantId\":\"uk\",\"moduleDetails\":[{\"moduleName\":\"common-masters\",\"masterDetails\":[{\"name\":\"Department\"},{\"name\":\"Designation\"},{\"name\":\"StateInfo\"}]},{\"moduleName\":\"tenant\",\"masterDetails\":[{\"name\":\"tenants\"},{\"name\":\"citymodule\"}]}]}}";

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: raw1,
        redirect: 'follow'
      };

      fetch("https://uttarakhand-dev.egovernments.org/egov-mdms-service/v1/_search?tenantId=uk", requestOptions)
        .then(response => response.text())
        .then(result => {
    obj=JSON.parse(result);
    nam.push({id:0,city:"Select City"})
    for (let i =0;i<obj.MdmsRes.tenant.tenants.length;i++){
      nam.push({id:i+1,city : obj.MdmsRes.tenant.tenants[i].name});
    }
    this.props.edit_nam(nam);
    })
      .catch(error => console.log('error', error));
      
    }
    handlechang(event){//Store value of district as user select
      this.setState({dist: 'uk.'+ event.target.value.toLowerCase()}); 
    }
  
    handleChange(event) {//store value of username as user enter
      this.props.edit_user(event.target.value);
    }
    handlechange(event){//store value of password as user enters
        this.props.edit_pass(event.target.value);
    }
  
   async handleSubmit(event) {//function to send user data entered in login page and generate auth id using api calls when user submit.
      event.preventDefault();       
      console.log('submitted');
      var user = this.props.user;
      var password = this.props.password;
      var tenant_Id = this.state.dist;
      const body = JSON.stringify({ user, password, tenant_Id });
      const body2 =JSON.stringify( {
        "user":"EMP-000006",
        "password":"09ue9aU1",
        "tenant_Id":"uk.haldwani"
      });
      console.log(body);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    try {
        const res1 = await axios.post('/api/auth',body2,config);
        const res = await axios.post('/api/auth', body, config);
        console.log(this.props);
        console.log(res1.data.access_token);
        if(res.status===200){
          this.props.edit_auth(res.data.access_token);
          this.props.edit_authid(res1.data.access_token);
          console.log(res);
          console.log("Succesfull");
          console.log(this.props);
          this.props.handleSuccesfulAuth();
    }
    } catch (error) {
        alert(error)
    }
}
  
    render() {//User interface of Login Page
      return (
        <div className="loginbox">
              <img  className="avatar" src={ require('./avatar.png')} />
              <h1>Login Here</h1>
              <form method='POST' onSubmit={this.handleSubmit}>{/* Form Containg fields to get the user data */}
                <p1>Username</p1><br></br>
                <input type="text" placeholder="Enter Username" value={this.props.user} onChange={this.handleChange} /><br></br>{/* input to get username of user */}
                <p1>Password</p1><br></br>
                <input type="Password" placeholder="Enter Password" value={this.props.password} onChange = {this.handlechange} /><br></br>{/* input to get password of user */}
                <p1>District</p1><br></br>
                <select onChange = {this.handlechang}>{/* Dropdown for selecting district of user */}
            {nam.map(item => (
              <option key={item.id} value={item.city}>
                {item.city}
              </option>
            ))}
          </select><br></br>
                <input type="submit" className='btn btn-primary' value="Submit" /><br></br>{/* Submit button to submit data entered by user */}
                <a href="/">Forgot Password?</a><br></br>{/* links for Forget password and signup */}
                <a href="/">Don't have an account</a>
              </form>
              <br></br>
              <br></br>
              <br></br>

              <p2>Authenticated By</p2><img className="digit" src={require('./digit.png')} />
            </div>
      
      );
    }
  }

const mapStateToProps = (state) =>{//Allows to access redux database
  return{
    user:state.user,
    password:state.password,
    auth_token:state.auth_token,
    auth_tokenid:state.auth_tokenid,
    nam : state.nam,
  }
}

const mapDispatchToProps = (dispatch) =>{//Functions provided by redux
  return{
    edit_user : (user) =>{dispatch({type:'EDIT_USERNAME',user : user})},
    edit_pass : (password) =>{dispatch({type:'EDIT_PASSWORD',password : password})},
    edit_auth : (auth_token)=>{dispatch({type:'AUTHENTICATE',auth_token:auth_token})},
    edit_authid : (auth_tokenid)=>{dispatch({type:'AUTHENTICATEID',auth_tokenid:auth_tokenid})},
    edit_nam:(nam)=>{dispatch({type:'CITIESLIST',nam:nam})},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Landing)