
import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NewLoan from "../forms/Loans/LoanForm";
import AccountsList from "../components/Accounts/AccountsList";
import EditLoanForm from "../forms/Loans/EditLoanForm";
import Loan from "../types/Loan";
import LoanService from "../services/LoanService";
import AccountsMain from "../pages/Accounts/AccountsMain";


const AccountRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<AccountsMain />} />
          <Route path="/new" element={<NewLoan />} />
    </Routes>
    </Container>
  );
};

export default AccountRouter;
