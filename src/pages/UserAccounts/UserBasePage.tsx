import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserBasePage = () => {
  const nav = useNavigate();

  return (
    <Container className="d-grid gap-2">
      <h1>User Management</h1>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          nav("customers");
        }}
      >
        Manage Customers
      </Button>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          nav("employees");
        }}
      >
        Manage Employees
      </Button>
    </Container>
  );
};

export default UserBasePage;
