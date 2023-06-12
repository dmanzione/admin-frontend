import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import UserBasePage from "../pages/UserAccounts/UserBasePage";

const UserRouter: React.FC = () => {
  return (
    <Container className="mt-3">
      <Routes>
      <Route path="/" element={<UserBasePage />} />
  
       
        <Route path="/:userId" element={<UserBasePage />} />
      </Routes>
    </Container>
  );
};

export default UserRouter;
