//Page to either go to road cutting form or search existing form and edit it
import React,{Component}from 'react';
import axios from 'axios';
import '../../App.css';
import {connect} from 'react-redux';//import redux
import Card from 'react-bootstrap/Card';//import card to diplay existing forms as card
import Button from 'react-bootstrap/Button';
import Dashboard from './Dashboard';//For sidebar and top menu
var items=[];
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
          wardno:'',
          todispl:false,
          obj:[],
        }
        this.onC = this.onC.bind(this);
        this.FormSubmit = this.FormSubmit.bind(this);
        this.chang = this.chang.bind(this);
        this.handlebutton = this.handlebutton.bind(this);
        this.errands = this.errands.bind(this);
        console.log(this.state);
      }
      async FormSubmit(event){//function to the list of existing forms of particular ward no and displaying them when user hit search after entering valid ward no 
          event.preventDefault();
          var road_ward_n=this.state.wardno;
          try {
            const res = await axios.get('/profile/form', {params:{
                road_ward_no:road_ward_n
            }});
            if(res.status===200){
              console.log(res.data);
              console.log("Succesfull");
              items = res.data;
              for(let i =0;i<items.length;i++){
                items[i].slno = i;
              }
              this.chang();
              console.log(this.state.todispl);
              console.log(items);
        }
        } catch (error) {
            alert(error)
        }
      }
      errands(){//to send user to edit page
        this.props.history.push("/edit");
      }
      onC(){//to send user to road cutting form page when he selects to form
        this.props.history.push("/form");
      }
      chang(){//to store value when user enter or changes ward no
        this.setState({todispl:true})
      }
      async handlebutton(e,idx){//to get the specific form data when user click on edit and save it in redux
        e.preventDefault();
        await this.props.copy_form(items[idx]);
        console.log(idx);
        this.errands()
      }
      render(){
          let disp ;
          let pos =0;
          if(!this.state.todispl||items.length==0){//To diplay when user entered invalid ward no
            disp = <h2>Enter a valid wardno</h2>
          }
          else{//to diplay all form with ward no entered by user
            {/* map to display all forms with ward no */}
            disp = items.map((d)=>
            <div key = {d._id}>
            <Card key ={d._id} className =  "card">{/* Card to diplay form data */}
            <Card.Body>
          <h5>Form No: {d._id}</h5>{/* data of form */}
          <h5>Name: {d.name}</h5>
          <h5>Email: {d.email}</h5>
          <h5>Locality: {d.road_locality}</h5>
          <h5>Category: {d.road_category}</h5>
          <h5>Reason: {d.road_cuttingReason}</h5>
          <Button className="abc" variant="primary" onClick={e => this.handlebutton(e,d.slno)}>Edit Form</Button>{/* edit button */}
            </Card.Body>
          </Card><br></br>
          </div>
          )

          }
          return(
            <div>
              <Dashboard />{/* side menuand top menu */}
              <form className='newf'>
                <p>Create new Form</p><br></br>
                <button onClick={this.onC}>To Form</button><br></br><br></br>
                <p>Search and Edit Existing Form</p><br></br>
    
                <label className='ll'>Ward No</label>
                {/* input to take ward no from user */}
                <input type="text" id="wardno" name="wardno" placeholder="Ward no in existing form"
                value={this.state.wardno}
                onChange={e => this.setState({ wardno: e.target.value,todispl:'false' })}/><br></br>
                <input type="submit" onClick={e => this.FormSubmit(e)} value="Search"/>{/* search button to search for forms with ward no */}
                
          </form><div>{disp}</div>
    </div>

          );
      }
}
const mapStateToProps = (state) =>{//Allows to access redux database
  return{
    user:state.user,
    password:state.password,
    auth_token:state.auth_token,
    formdata:state.formdata,
  }
}

const mapDispatchToProps = (dispatch) =>{//Functions provided by redux
  return{
    edit_user : (user) =>{dispatch({type:'EDIT_USERNAME',user : user})},
    edit_pass : (password) =>{dispatch({type:'EDIT_PASSWORD',password : password})},
    edit_auth : (auth_token)=>{dispatch({type:'AUTHENTICATE',auth_token:auth_token})},
    copy_form : (formdata) =>{dispatch({type:'COPYFORMDETAILS',formdata:formdata})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search)