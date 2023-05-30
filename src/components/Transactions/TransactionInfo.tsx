import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const TransactionInfo: React.FC = () => {

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
          {transaction?.fromAccount &&
          "From: " + transaction?.fromAccount?.number + " " + transaction?.fromAccount?.customer?.firstName + " " + transaction?.fromAccount?.customer?.lastName + <br />}
         
          {transaction?.toAccount &&
          "To: " + transaction?.toAccount?.number + " " + transaction?.toAccount?.customer?.firstName + " " + transaction?.toAccount?.customer?.lastName + <br />}
        
          {transaction?.category && "Type: " + transaction?.category + <br />}

          {transaction?.amount && "Amount: " + transaction?.amount + <br />}
          {transaction?.date && "Date: " + transaction?.date + <br />}
          

        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TransactionInfo;