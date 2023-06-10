import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import CustomerPage from "../pages/UserAccounts/CustomerPage";
import EmplCollectionPage from "../pages/UserAccounts/EmplCollectionPage";
import CustCollectionPage from "../pages/UserAccounts/CustCollectionPage";
import EmployeePage from "../pages/UserAccounts/EmployeePage";
import NewEmployeePage from "../pages/UserAccounts/NewEmployeePage";
import NewCustomerPage from "../pages/UserAccounts/NewCustomerPage";
import UserBasePage from "../pages/UserAccounts/UserBasePage";

const UserRouter: React.FC = () => {
  return (
    <Container className="mt-3">
      <Routes>
      <Route path="/" element={<UserBasePage />} />
      <Route path="/customers" element={<CustCollectionPage />} />
        <Route path="/customers/new" element={<NewCustomerPage />} />
        <Route path="/customers/:id" element={<CustomerPage />} />
        <Route path="/employees/new" element={<NewEmployeePage />} />
        <Route path="/employees/:id" element={<EmployeePage />} />
        <Route path="/employees" element={<EmplCollectionPage />} />
        <Route path="/:userId" element={<UserBasePage />} />
      </Routes>
    </Container>
  );
};

export default UserRouter;
