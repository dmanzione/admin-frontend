
import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import AccountsMain from "../pages/Accounts/AccountsMain";
import AccountInfo from "../pages/Accounts/AccountInfo";
import CheckingAccountForm from "../forms/Accounts/CheckingAccounts/CheckingAccountForm";
import SavingsAccountForm from "../forms/Accounts/SavingsAccounts/SavingsAccountForm";
import CreditCardAccountForm from "../forms/Accounts/CreditCardAccounts/CreditCardAccountForm";
import LoanForm from "../forms/Accounts/Loans/LoanForm";


const AccountRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<AccountsMain />} />
          <Route path="/:accountId" element={<AccountInfo />} />
          <Route path="/checking/new" element={<CheckingAccountForm/>}/>
          <Route path="/savings/new" element={<SavingsAccountForm/>}/>
          <Route path="/credit/new" element={<CreditCardAccountForm/>}/>
          <Route path="/loan/new" element={<LoanForm/>}/>
          

      
    </Routes>
    </Container>
  );
};

export default AccountRouter;
