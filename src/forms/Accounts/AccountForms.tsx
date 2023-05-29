import { ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
import TransactionFormGeneral from "../Transactions/TransactionFormGeneral";

export default function AccountForms() {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Link to="credit/new">Open Credit Card Account </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="checking/new">Open Checking Account </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="savings/new">Open Savings Account </Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="loan/new">Open Loan Account </Link>
      </ListGroup.Item>
        <ListGroup.Item>
       <TransactionFormGeneral />
        </ListGroup.Item>
    </ListGroup>
  );
}
