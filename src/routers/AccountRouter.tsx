
import { Container } from "react-bootstrap";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import AccountsMain from "../pages/Accounts/AccountsMain";
import AccountInfo from "../pages/Accounts/AccountInfo";


const AccountRouter: React.FC = () => {
  return (
    <Container>
      <Routes>
          
          <Route path="/" element={<AccountsMain />} />
          <Route path="/:accountId" element={<AccountInfo />} />

      
    </Routes>
    </Container>
  );
};

export default AccountRouter;
