import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import  AccountsTemplate from "../pages/Accounts/AccountsTemplate";
import AccountInfo from "../pages/Accounts/AccountInfo";

import LoanAccountForm from "../forms/AccountForms/AccountForm";
import TransactionInfo from "../components/Transactions/TransactionInfo";
import AccountsDashboard from "../pages/Accounts/AccountsDashboard";
import AccountTypes from "../pages/Accounts/AccountTypes";
import TransactionHistoryAll from "../components/Transactions/TransactionHistoryAll";
import AccountForm from "../forms/AccountForms/AccountForm";
import TransactionFormGeneral from "../forms/Transactions/TransactionFormGeneral";

const TransactionRouter: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<TransactionHistoryAll/>} children={[
        
        
            <Route path="/new" element={<TransactionFormGeneral/>} />,
          
          ]
        }/>
    </Routes>
  );
};

export default TransactionRouter;
