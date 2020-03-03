//Top Menu Page
"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';//importing navbar items for top menu
class Menu extends React.Component{
    render(){
        return(
            <Navbar inverse fixedTop expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Home</Navbar.Brand>
  <Nav.Link href="/">Features</Nav.Link>
      <Nav.Link href="/">Pricing</Nav.Link>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href="/">Change Password</Nav.Link>
      <Nav.Link eventKey={2} href="/">
        Sign Out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        );
    }
}
export default Menu;