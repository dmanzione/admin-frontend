import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Tab,
  Tabs,
} from "react-bootstrap";
import LoanDashboard from "../../components/Loans/LoanDashboard";
import LoanForm from "../../forms/Loans/LoanForm";
import { LoanType } from "../../types/LoanType";
import LoanTypes from "../../components/Loans/LoanTypes";

export default function LoanMain() {
  return (
    <>
  <div className="container-fluid p-5 bg-primary text-white text-center">
  <h1>Loan Management</h1>
</div>
    
      <Tabs
        defaultActiveKey="profile"
        className="mb-3"
        fill
        variant=""
      >
        <Tab eventKey="home" title="Existing Loans">
          <LoanDashboard />
        </Tab>
        <Tab eventKey="profile" title="Start Client Application">
          <LoanForm />
        </Tab>
        <Tab eventKey="longer-tab" title="Loan Types">
          <LoanTypes />
        </Tab>
      </Tabs>
    </>
  );
}
