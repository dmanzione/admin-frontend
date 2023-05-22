import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import Loan from '../../types/Loan';
import { getAllLoans } from '../../services/LoanService';
import { Link } from 'react-router-dom';

const LoanDashboard = () => {
  const [loans, setLoans] = React.useState<Loan[]>(new Array<Loan>());
  useEffect(() => {
    getAllLoans().then(loans => setLoans(loans)).catch(err => console.log(err));
    console.log(loans);
    console.log(loans)
  },[loans])

  
  return (
    <Container fluid className="dashboard">
      {/* <Row> */}
        
         {/* <Col md={4}> */}
          {/* <Card className="account-card">
            <Card.Body>
              <Card.Title>{loans[1].loanType}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{loans![0].loanNumber}</Card.Subtitle>
              <Card.Text>
                Balance: ${loans[1].account.balance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card> */}
        {/* </Col> */}
        {/* <Col md={12}> */}          <h1>Loan Dashboard</h1>


          <Table striped bordered bg-primary hover className="loan-table">
            <thead>
              
              <tr>
                <th>PK</th>
                <th>Loan Number</th>
                <th>Principal</th>
                <th>Rate</th>
                <th>Initial Amount</th>
                <th>Loan Term</th>
                <th>Due Date</th>
                <th>Start Date</th>
                <th>Loan Type</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
              
              <tr key={loan.pk}>
              <a href={`/loans/${loan.pk}`}><td>{loan.pk} </td></a>

                 <td>${loan.loanId}</td>
                  <td>${loan.principal.toFixed(2)}</td>
                  <td>{loan.rate}%</td>
                  <td>${loan.initialAmount.toFixed(2)}</td>
                  <td>{loan.loanTerm} months</td>
                  <td>{String(loan.dueDate)}</td>
                  <td>{String(loan.startDate)}</td>
                  <td><Badge>{loan.loanType}</Badge></td>
                </tr>

              ))}
            </tbody>
          </Table>
        {/* </Col> */}
      {/* </Row> */}
     </Container>
  );
};

export default LoanDashboard;
