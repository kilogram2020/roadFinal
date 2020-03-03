import React, { Component } from 'react';
// import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Dashboard from './components/layouts/Dashboard'
import Home from './components/layouts/Home'
import Form from './components/layouts/Form'
import Search from './components/layouts/Search'
import editForm from './components/layouts/editForm'
import Payment from'./components/layouts/Payment'
import Reciept from './components/layouts/Reciept'
class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus : "NOT_LOGGED_IN",
      user : "",
      userdata : "",
    }
  }
  render(){
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path ={'/'}
        render = {
          props=>(
            <Home {...props} loggedInStatus = {this.state.loggedInStatus}/>
          )}/>
        <Route exact path ={'/dashboard'} component = {Dashboard}/>  
        <Route exact path ={'/form'} component = {Form}/>  
        <Route exact path ={'/search'} component = {Search}/>
        <Route exact path ={'/edit'} component = {editForm}/>
        <Route exact path ={'/pay'} component = {Payment}/>
        <Route exact path ={'/reciept'} component = {Reciept}/>

      </Switch>
      </BrowserRouter>

    </div>
  );
}
}
export default App;
