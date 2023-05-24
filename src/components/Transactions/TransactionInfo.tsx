import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Account } from '../Accounts/Account';
import Transaction from '../../types/Transaction';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const TransactionInfo: React.FC = () => {
 const [fromAccount, setFromAccount] = useState<Account>();
 const [toAccount, setToAccount] = useState<Account>(); 
 const [transaction, setTransaction] = useState<Transaction>();
 
 const baseURL = 'http://localhost:8080/accounts-api/transactions';
 const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With'
    },
  });
  const transactionPk = useParams().pk;

 useEffect(() => {
    document.title = 'Transaction Info';

    api.get('/' + transactionPk)
        .then(response => {
            setTransaction(response.data);
          })
        .catch(error => {
            console.log(error);
          });
      }, []);


  return (
    <Card>
      <Card.Body>
        <Card.Title>Transaction</Card.Title>
        <Card.Text>
          From: {(transaction||'N/A').toString()|| 'N/A'}
          <br />
          To: {(transaction||'N/A').toString() || 'N/A'}
          <br />
          Amount: {transaction!.amount || 'N/A'}
          <br />
          Date: {transaction!.date.toDateString() || 'N/A'}

        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Transaction;