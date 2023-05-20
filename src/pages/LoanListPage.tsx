import { Container, Nav, Navbar } from "react-bootstrap";
import LoanList from "../components/LoanListComponent/LoanList";

export default function LoanListPage() {
  return (
    <Container>
      <h1 className="text-center d-3">Loans</h1>

      <Navbar>
       
        <Nav
         
        >
          <Nav.Item>
            <Nav.Link href="/">Loans</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link href="/new">Apply</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/edit">Edit</Nav.Link>
          </Nav.Item>
          
        </Nav>
      </Navbar>

      <Container>


        <LoanList />
      </Container>
    </Container>
  );
}
