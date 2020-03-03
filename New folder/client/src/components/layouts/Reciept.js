import React,{Component}from 'react';
import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import axios from 'axios';
import {xx} from './Payment';
class Reciept extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            
        }
    }
    render(){
        return(
            <div className="pay">
                <Dashboard />
                <form className="zz">
                    <h2>Reciept</h2>
                    <p>Payment Information</p>
        <label>Payment ID : {xx.data.Payments[0].id}</label><br></br><br></br><br></br>
        <label>Transaction Number : {xx.data.Payments[0].transactionNumber}</label><br></br><br></br><br></br>
        <label>Payment Amount : {xx.data.Payments[0].totalAmountPaid}</label><br></br><br></br><br></br>

                </form>
            </div>

        );
}
}
const mapStateToProps = (state) =>{
    return{
      user:state.user,
      password:state.password,
      auth_token:state.auth_token,
      consumCode:state.consumCode,
    }
  }
export default connect(mapStateToProps)(Reciept)