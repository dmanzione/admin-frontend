import {
  Tab,
  Tabs,
} from "react-bootstrap";
import AccountsDashboard from "./AccountsDashboard";
import AccountTypes from "../../components/Accounts/AccountTypes";
import AccountForms from "./AccountForms";
import TransactionForm from "../../forms/Transactions/TransactionForm";
import TransactionHistoryAll from "../../components/Transactions/TransactionHistoryAll";
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
        <Tab eventKey="tab" title="Forms">
          <AccountForms />
        </Tab>
        <Tab eventKey="tab2" title="Transactions">
          <TransactionHistoryAll />
        </Tab>
      </Tabs>
    </>
  );
}
