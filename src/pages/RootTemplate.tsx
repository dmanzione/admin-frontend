import React, { useState } from "react";
import {
  Navbar,
  Nav,
 
  Button,
  Collapse,
  Image,
} from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedIn = useState<boolean>(false);
  const styles = {
    width: "200px",
    margin:'0'
  }
  return (
    <>
      <div className="container-fluid p-0 text-center ">
        <Image src="assets/logo-black.png" alt="logo" style={styles} ></Image>
      </div>
      <Navbar className=" p-3 bg-outline-secondary" expand="lg">
        <Navbar.Brand href="/"><Image src="assets/logo-black.png" width={50}></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav className="mr-auto">
            <NavLink className="btn btn-sm btn-outline-secondary border-light well" to="/accounts">Accounts</NavLink>
            <NavLink className="btn btn-sm btn-outline-secondary border-light well" to="/transactions">Transactions</NavLink>
            <NavLink className="btn btn-sm btn-outline-secondary border-light well" to="/cards">Cards</NavLink>
            <NavLink className="btn btn-sm btn-outline-secondary border-light well" to="/branches">Branches</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end well">
          <span className="well">
            {loggedIn  &&
            <NavLink to={'/login'} className="btn btn-sm btn-outline-secondary border-light well">Log In</NavLink>

} {!loggedIn &&
            <NavLink to={'/logout'} className="btn btn-sm btn-outline-secondary border-light well">Log Out</NavLink>
}
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
