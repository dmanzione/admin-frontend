import { CardGroup, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AccountsDashboard from "./Accounts/AccountsDashboard";
import TransactionHistory from "./Transactions/TransactionHistory";
import TransactionHistoryAll from "./Transactions/TransactionHistoryAll";
import AccountsList from "./Accounts/AccountsList";
import TransactionList from "./Transactions/TransactionList";

export default function HomePage (){
  const navigate = useNavigate();

  
    
    return(
        <Container fluid>
        <div className=" text-center">
           <p className="d3">Home Page</p>
        </div>
        <div className="container">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Header>Summary of Accounts</Card.Header>
            <Card.Body>
              <p className="overflow-hidden">
                <AccountsList/>
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="" />
            <Card.Header>Summary of Transactions</Card.Header>
            <Card.Body>
                <p className="overflow-scroll"><TransactionList/></p>
            </Card.Body>
          </Card>
          {/* <Card>
          
            <Card.Header>Profile Actions</Card.Header>
            <Card.Body>
                <p></p>
            </Card.Body>
          </Card> */}
        </CardGroup>
        
      </div>
      </Container>
    )
}