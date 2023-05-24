import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import axios from 'axios';
interface TransactionHistoryProps {
  
  account: Account;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = (props: TransactionHistoryProps)=>{
 
    const account:Account= props.account;
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const api = axios.create({
        baseURL: 'http://localhost:8080/accounts-api/transactions', headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${account.token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers'
        }
    })

    
    const [show,setShow] = useState<boolean>(false);

    useEffect(()=>{
        
                api.get("").then(res =>
                
                setTransactions(res.data)).catch(err => console.log(err));

                setTransactions(transactions => transactions.filter(transaction => transaction.fromAccount!.pk === account.pk || transaction.toAccount!.pk === account.pk))
                
               
    },[])


    function onHide(): void {
       setShow(false);
    }

  return (
    <Container>
    <Button variant="link" onClick={() => setShow(!show)}>
      Transaction History
    </Button>
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Transaction History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.pk}>
                <td>{transaction.fromAccount?.toString()||'N/A'}</td>
                <td>{transaction.toAccount?.toString()|| 'N/A'}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
    </Container>
  );
};

export default TransactionHistory;