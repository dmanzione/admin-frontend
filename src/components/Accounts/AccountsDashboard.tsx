import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import Account from '../../types/Account';
import { getAllAccounts } from '../../services/AccountService';
import { Link } from 'react-router-dom';

const AccountDashboard = () => {
  const [accounts, setAccounts] = React.useState<Account[]>(new Array<Account>());
  useEffect(() => {
    getAllAccounts().then(accounts => setAccounts(accounts)).catch(err => console.log(err));
    console.log(accounts);
    console.log(accounts)
  },[accounts])

  
  return (
    <Container fluid className="dashboard">
      {/* <Row> */}
        
         {/* <Col md={4}> */}
          {/* <Card className="account-card">
            <Card.Body>
              <Card.Title>{accounts[1].accountType}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{accounts![0].accountNumber}</Card.Subtitle>
              <Card.Text>
                Balance: ${accounts[1].account.balance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card> */}
        {/* </Col> */}
        {/* <Col md={12}> */}          <h1>Account Dashboard</h1>


          <Table striped bordered bg-primary hover className="account-table">
            <thead>
              
              <tr>
                <th>PK</th>
                <th>Account Number</th>
                <th>Principal</th>
                <th>Rate</th>
                <th>Initial Amount</th>
                <th>Account Term</th>
                <th>Due Date</th>
                <th>Start Date</th>
                <th>Account Type</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
              
              <tr key={account.pk}>
              <a href={`/accounts/${account.pk}`}><td>{account.pk} </td></a>

                 <td>${account.pk}</td>
                  <td>${account.id}</td>
                  <td>{account.rate}%</td>
                  <td>${account.balance}</td>
                  <td>{String(account.dateCreated)} months</td>
                  <td>{account.status}</td>
                  <a href={'/accounts/'+account.pk}><td>{account.owner}</td></a>
                  <td><Badge>{account.type}</Badge></td>
                </tr>

              ))}
            </tbody>
          </Table>
        {/* </Col> */}
      {/* </Row> */}
     </Container>
  );
};

export default AccountDashboard;
