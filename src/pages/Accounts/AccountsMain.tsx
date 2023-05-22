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
  import AccountsDashboard from "../../components/Accounts/AccountsDashboard";
  import AccountForm from "../../forms/Accounts/AccountForm";
  import { AccountType } from "../../types/AccountType";
import AccountTypes from "../../components/Accounts/AccountTypes";
  
  export default function AccountMain() {
    return (
      <>
    <div className="container-fluid p-5 bg-primary text-white text-center">
    <h1>Account Management</h1>
  </div>
      
        <Tabs
          defaultActiveKey="profile"
          className="mb-3"
          fill
          variant=""
        >
          <Tab eventKey="home" title="Existing Accounts">
            <AccountsDashboard />
          </Tab>
          <Tab eventKey="profile" title="Start Client Application">
            <AccountForm />
          </Tab>
          <Tab eventKey="longer-tab" title="Account Types">
            <AccountTypes />
          </Tab>
        </Tabs>
      </>
    );
  }
  