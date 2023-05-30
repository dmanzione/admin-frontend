import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import  AccountsTemplate from "../pages/Accounts/AccountsTemplate";
import AccountInfo from "../pages/Accounts/AccountInfo";
import CheckingAccountForm from "../forms/Accounts/CheckingAccounts/CheckingAccountForm";
import SavingsAccountForm from "../forms/Accounts/SavingsAccounts/SavingsAccountForm";
import CreditCardAccountForm from "../forms/Accounts/CreditCardAccounts/CreditCardAccountForm";
import AccountFinancialProducts from "../pages/Accounts/AccountFinancialProducts";
import LoanAccountForm from "../forms/Accounts/LoanAccounts/LoanAccountForm";
import EditAccountForm from "../forms/Accounts/EditAccountForm";
import Account from "../types/Account";
import TransactionInfo from "../components/Transactions/TransactionInfo";
import TransactionHistory from "../components/Transactions/TransactionHistory";
import AccountsDashboard from "../components/Accounts/AccountsDashboard";
import AccountTypes from "../components/Accounts/AccountTypes";
import AccountForms from "../forms/Accounts/AccountForms";
import TransactionHistoryAll from "../components/Transactions/TransactionHistoryAll";

const AccountRouter: React.FC = () => {
  return (
    
      <Routes>
        <Route
         path="" element={<AccountsTemplate children={<AccountsDashboard/>} />}

/>
        <Route
          path="forms/checking/new"
          element={<AccountsTemplate children={<Container className="m3"><CheckingAccountForm/></Container>} />}
          ></Route>
        <Route
          path="/forms/savings/new" element={<AccountsTemplate children={<SavingsAccountForm/>} />}
          ></Route>
        <Route
          path="/forms/credit/new" element={<AccountsTemplate children={<CreditCardAccountForm/>} />}
          ></Route>
        <Route path="/forms/loan/new" element={<AccountsTemplate children={<LoanAccountForm/>} />}></Route>
        
        
        
        <Route
          path="/:accountId" element={<AccountsTemplate children={<AccountInfo/>} />}
          ></Route>
        <Route
          path="/types" element={<AccountsTemplate children={<AccountTypes/>} />}
          ></Route>
        <Route
          path="/forms" element = {<AccountsTemplate children={<AccountForms/>} />}>
            </Route>
          
        <Route
          path="/transaction-history" element={<AccountsTemplate children={<TransactionHistoryAll/>} />}
          />
        <Route
          path="/:accountId/transactions/:transactionId" element={<AccountsTemplate children={<TransactionInfo/>} />}
          ></Route>
      </Routes>
    
  );
};

export default AccountRouter;
