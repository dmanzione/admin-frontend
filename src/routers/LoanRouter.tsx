import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import LoanListComponent from "../components/LoanListComponent/LoanList";
import LoanListPage from "../pages/LoanListPage";
import FormComponent from "../components/FormComponent";
import LoanList from "../components/LoanListComponent/LoanList";
import EditLoan from "../components/EditLoanComponent/EditLoan";
import NewLoan from "../components/NewLoanComponent/NewLoan";

const LoanRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<LoanListPage />} />
          <Route path="/new" element={<NewLoan />} />
          <Route path="/:id/edit" element={<EditLoan />} />

    </Routes>
    </Container>
  );
};

export default LoanRouter;
