

import React from 'react';
import { Navbar, Nav,  Card, Container, CardGroup, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();
  return (
      
    <>
       <div className="container-fluid p-5 bg-secondary text-white text-center">
        <h1>{document.title}</h1>
      </div>
      <Navbar  variant="primary" expand="lg">
        <Navbar.Brand href="#">Binary Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/accounts">Accounts</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/cards">Cards</Nav.Link>
            <Nav.Link href="/messages">Messages</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant="outline-primary rounded-0">Log Out</Button>
        <Button variant="outline-primary rounded-0">Log In</Button>
      </Navbar>
     
     
        <Outlet />
       
        <Button variant="outline-primary rounded-0 float-left" onClick={()=>navigate(-1)}>Go Back</Button>
        <Button variant="outline-primary rounded-0 float-right" onClick={()=>navigate(1)}>Go Forward</Button>
    </>
  );
};

export default HomePage;