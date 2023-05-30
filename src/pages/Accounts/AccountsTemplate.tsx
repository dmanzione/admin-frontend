import { Container, Nav, Tab, Tabs } from "react-bootstrap";
import AccountsDashboard from "../../components/Accounts/AccountsDashboard";
import AccountTypes from "../../components/Accounts/AccountTypes";
import AccountForms from "../../forms/Accounts/AccountForms";
import TransactionHistoryAll from "../../components/Transactions/TransactionHistoryAll";
import {  RouteProps, Router, RouterProps, Routes } from "react-router-dom";
import AccountInfo from "./AccountInfo";
import React, { ReactFragment, ReactNode } from "react";
// import EditAccountForm from "../../forms/Accounts/EditAccountForm";
export interface PageTemplateProps{
  children: ReactNode;
}
const AccountsTemplate = ({children}:PageTemplateProps) => {
  
  return (
    
   <Container>
      <div className="container-fluid p-5 bg-primary text-white text-center">
        <h1>Account Management</h1>
      </div>
    
      <Nav className="d-flex justify-content-between">
        <Nav.Item>
          <Nav.Link eventKey={1} href="/accounts">
            Accounts
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2} href="/accounts/types">
            Account Types
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={3} href="/accounts/forms">
            Account Forms
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={4} href="/accounts/transaction-history">
            Transaction History
          </Nav.Link>
        </Nav.Item>
        
      </Nav>
      <Container>
        {children}
        
      </Container>
      

  </Container>
  );
}
export default AccountsTemplate;
