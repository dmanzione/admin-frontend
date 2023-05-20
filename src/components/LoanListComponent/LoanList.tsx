// This is a React component that displays a list of all loans it retrieves from an API
// It uses TypeScript, Axios, error handling, comments, hooks, and reactive features

// Import React and Axios libraries
import { useState, useEffect } from "react";
import axios from "axios";
import Loan from "../../types/Loan";
import { Container, ListGroup } from "react-bootstrap";
import Account from "../../types/Account";
import LoanService from "../../services/LoanService";


// Define the component function
const LoanList = () => {
  // Use state hooks to store the loan data and the error message
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);

  const loanService:LoanService = LoanService.getInstance();



  // Return the JSX element to render the component


  loanService.getLoans().then(accounts => {
    setAccounts(accounts);
  }).catch(error => {
    setError(error.message);
  });
  return (
    <div className="loan-list">
      <h1>Loan List</h1>
      {/* Check if there is any error and display it */}
      {error && <p className="error">{error.toString()}</p>}
      {/* Check if there is any loan data and display it as a list */}
      {loans.length > 0 && (
        <Container>
          
        <h3>Loans</h3>
      
          {loans.map((loan:Loan) => (
            <ListGroup className="list bg-primary">
            <ListGroup.Item key={loans.indexOf(loan)} variant="primary">
              

              <p>Loan Account #: {loan.account.id}</p>
                          
              <p>Amount: ${loan.initialAmount}</p>
              <p>Interest: {loan.rate}%</p>
              <p>Type: {loan.loanType}</p>
            </ListGroup.Item>
            </ListGroup>
          ))}
    

        </Container>
      )}
    </div>
  );
};

// Export the component
export default LoanList;
