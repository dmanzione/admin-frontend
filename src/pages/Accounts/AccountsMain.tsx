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
import AccountForm from "../../forms/Accounts/SavingsAccounts/SavingsAccountForm";
import { AccountType } from "../../types/AccountType";
import AccountTypes from "../../components/Accounts/AccountTypes";
import EditAccountForm from "../../forms/Accounts/EditAccountForm";
// import EditAccountForm from "../../forms/Accounts/EditAccountForm";

export default function AccountMain() {
  return (
    <>
      <div className="container-fluid p-5 bg-primary text-white text-center">
        <h1>Account Management</h1>
      </div>

      <Tabs defaultActiveKey="home" className="mb-3" fill variant="">
        <Tab eventKey="home" title="Existing Accounts">
          <AccountsDashboard />

          
        </Tab>
        <Tab eventKey="longer-tab" title="Account Types">
          <AccountTypes />
        </Tab>
      </Tabs>
    </>
  );
}
