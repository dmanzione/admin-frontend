import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CustomerPage from "../pages/UserAccounts/CustomerPage";
import EmplCollectionPage from "../pages/UserAccounts/EmplCollectionPage";
import CustCollectionPage from "../pages/UserAccounts/CustCollectionPage";
import EmployeePage from "../pages/UserAccounts/EmployeePage";

const UserRouter: React.FC = () => {
  return (
    <Container className="mt-3">
      <Routes>
        <Route path="/customers/:id" element={<CustomerPage />} />
        <Route path="/customers" element={<CustCollectionPage />} />
        <Route path="/employees/:id" element={<EmployeePage />} />
        <Route path="/employees" element={<EmplCollectionPage />} />
      </Routes>
    </Container>
  );
};

export default UserRouter;
