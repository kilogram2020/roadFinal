//Payment Page
import React,{Component}from 'react';
import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import axios from 'axios';
var ppp;
export var xx=[];
class Payment extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            payId:'',
            amount:'',
            paidBy:'',
            payerName:'',
            payerMobNo:'',
            msRecieptNo:'',
            msIssueDate: new Date(),
        }
        this.gr = this.gr.bind(this);//binds function so make it usable in render by this.
    }
   async componentDidMount(){
        const body = JSON.stringify({
            "consumcode":this.props.consumCode,
            "auth_token":this.props.auth_token
        });
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        try {
            const res = await axios.post('/form/payment',body,config);
            console.log(res);
            this.setState({payId:res.data.Bill[0].id});
            ppp=res.data.Bill[0].totalAmount;
            this.setState({amount:ppp});
        } catch (error) {
            
        }
    }
    async gr(event){
        event.preventDefault();
        var auth_token = this.props.auth_token;
        var billId=this.state.payId;
        var totalAmountPaid=this.state.amount;
        var mobileNumber=this.state.payerMobNo;
        var payerName=this.state.payerName;
        const body =JSON.stringify({auth_token,billId,totalAmountPaid,mobileNumber,payerName});
        const config = {
            headers:{
                "Content-Type":'application/json'
            }
        }
        try {
            const res=await axios.post('/form/collect',body,config);
            console.log(res);
            xx=res;
            this.props.history.push("/reciept");
        } catch (error) {
            alert(error);
            
        }
    }
    render(){
        return(
            <div className="pay">
            <Dashboard />
            <form className="zz">
            <h2>Payment Page</h2><br></br>
            <p>Payment Information</p><br></br>
        <label>Unique ID:{this.state.payId}</label><br></br><br></br>
                <p>Payement Collection Details</p><br></br>
                <label>Fee Details : Road Cutting Charges</label><br></br>
                <label>Total Amount :{this.state.amount}</label><br></br><br></br>
                <p>Capture Payment</p><br></br>
                <label>Paid By&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select value={this.state.paidBy}
    onChange={e => this.setState({ paidBy: e.target.value })}>
    <option value="">select</option>
    <option value="Owner">Owner</option>
    <option value="Other">Other</option>
  </select><br></br>
  <label>Payer Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
  <input type="text" id="payerName" name="payerName" placeholder="Enter Your Name"
    value={this.payerName}
    onChange={e => this.setState({ payerName: e.target.value })}
  /><br></br>
  <label>Payer Mobile No</label>
  <input type="text" id="payerMobNo" name="payerMobNo" placeholder="Enter Your Mobile No"
    value={this.payerMobNo}
    onChange={e => this.setState({ payerMobNo: e.target.value })} /><br></br><br></br>
    <p>MSC5/MSC2 Reiept Details (Optional)</p><br></br>
    <label>MSC5/MSC2 Reciept No.</label>
    <input type="text" id="msRecieptNo" name="msRecieptNo" placeholder="Enter MSC5/MSC2 Reciept No."
    value={this.msRecieptNo}
    onChange={e => this.setState({ msRecieptNo: e.target.value })} /><br></br>
    <label>MSC5/MSC2 Reciept Issue Date</label>
    <input type="date" id="msIssueDate" name="msIssueDate" placeholder="Enter MSC5/MSC2 Issue Date."
    value={this.msIssueDate}
    onChange={e => this.setState({ msIssueDate: e.target.value })} />
    <br></br><br></br>
    <button type="button" onClick={e => this.gr(e)}>Collect Payment</button>
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
export default connect(mapStateToProps)(Payment)