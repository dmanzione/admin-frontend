import React from "react";
import {
  Navbar,
  Nav,
 
  Button,
  Collapse,
} from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid p-5 bg-secondary text-white text-center">
        <h1>{document.title}</h1>
      </div>
      <Navbar variant="primary" expand="lg">
        <Navbar.Brand href="/">Binary Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/users/customers">Customer Profiles</Nav.Link>
            <Nav.Link href="/accounts">Accounts</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/cards">Cards</Nav.Link>
            <Nav.Link href="/branches">Branches</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end well">
          <span className="well">
            <button className="btn btn-sm btn-outline-secondary border-light well">Log Out</button>
            <button className="btn btn-sm btn-outline-secondary border-light well">Log In</button>
          </span>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
      <div className="d-flex justify-content-center border-bottom pb-2">
        <Button
          variant="outline-primary rounded-0 float-left"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="outline-primary rounded-0 float-right"
          onClick={() => navigate(1)}
        >
          Go Forward
        </Button>
      </div>
    </>
  );
};

export default HomePage;
