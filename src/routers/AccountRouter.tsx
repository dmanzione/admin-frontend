
import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NewLoan from "../components/NewLoanComponent/NewLoan";
import EditLoan from "../components/EditLoanComponent/EditLoan";
import AccountsList from "../components/AccountsListComponent/AccountsList";


const AccountRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<AccountsList />} />
          <Route path="/new" element={<NewLoan />} />
          <Route path="/:id/edit" element={<EditLoan />} />
          
    </Routes>
    </Container>
  );
};

export default AccountRouter;
