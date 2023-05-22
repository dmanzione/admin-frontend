import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import EditLoanForm from "../forms/Loans/EditLoanForm";
import LoanForm from "../forms/Loans/LoanForm";
import LoanService, { getLoanByPk } from "../services/LoanService";
import LoanCard from "../components/Loans/LoanCard";
import LoanDashboard from "../components/Loans/LoanDashboard";
import LoanMain from "../pages/Loans/LoanMain";

const LoanRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<LoanMain/>} />
          <Route path="/new" element={<LoanForm />} />
          <Route path="/:id/edit" element={<EditLoanForm/>}/>;
          <Route path="/:id/" element={<LoanCard/>}/>

    </Routes>
    </Container>
  );
};

export default LoanRouter;
