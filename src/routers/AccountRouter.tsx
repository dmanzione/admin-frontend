import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import  AccountsTemplate from "../pages/Accounts/AccountsTemplate";
import AccountInfo from "../pages/Accounts/AccountInfo";

import LoanAccountForm from "../forms/AccountForms/AccountForm";
import TransactionInfo from "../pages/Transactions/TransactionInfo";
import AccountsDashboard from "../pages/Accounts/AccountsDashboard";
import AccountTypes from "../pages/Accounts/AccountTypes";
import TransactionHistoryAll from "../pages/Transactions/TransactionHistoryAll";
import AccountForm from "../forms/AccountForms/AccountForm";

const AccountRouter: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<AccountsTemplate/>} children={[
        
        
            <Route path="/" element={<AccountsDashboard/>} />,
        <Route path="/new" element={<AccountForm/>} />,
        
        
        
        <Route
          path="/:accountId" element={<AccountInfo/>} />,
     
        <Route
          path="/types" element={<AccountTypes/>} />,
       
        
          
        <Route
          path="/transaction-history" element={<TransactionHistoryAll/>} />,
        
        <Route
          path="/:accountId/transactions/:transactionId" element={<TransactionInfo/>} />
          
          ]
        }/>
    </Routes>
  );
};

export default AccountRouter;
