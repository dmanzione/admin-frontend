import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Modal } from "react-bootstrap";
import Account from "../../types/Account";
import { getName } from "../../types/AccountType";
import Transaction from "../../types/Transaction";
import TransactionType from "../../types/TransactionType";
import { TransactionStatus } from "../../types/TransactionStatus";
import FinancialProduct from "../../types/FinancialProduct";
import Balance from "../../types/Balance";

interface TransactionHistoryProps {
  account: Account;
}

const TransactionForm: React.FC<TransactionHistoryProps> = (
  props: TransactionHistoryProps
) => {
  const account: Account = props.account;

  const [fromAccountNumber, setFromAccountNumber] =
    useState<string>(account.number!);
  const [toAccountNumber, setToAccountNumber] = useState<string>(account.number!);
  const [fromAccount, setFromAccount] = useState<Account>();
  const [toAccount, setToAccount] = useState<Account>(account);
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>(new Array<Account>());
  const [show, setShow] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEPOSIT);
 
 
  const api = axios.create({
  
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  useEffect(() => {
    api
    .get("http://localhost:8080/accounts-api/accounts/?page=0&size=")
      .then((res) => {
        setAccounts(res.data.content);
        console.log(res.data.content)
  
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const transaction: Transaction = {
      pk: null,
      fromAccount: fromAccount!,
      toAccount: toAccount!,
      amount: amount,
      date: new Date(),

      category: transactionType!,
    };

    api
      .post(`http://localhost:8080/accounts-api/transactions/`, transaction)
      .then((res) => {

        alert("Transaction successful: " +res.data.statusText);
      })
      .catch((err) => {
        alert("There was an error in the transaction: " + err.response.data.statusText);
      });
  };

  return (
    <Container>
    <Button variant="link" onClick={()=>setShow(true)}>
      Initiate Transaction
    </Button>
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Initiate Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="transactionType">
        <Form.Label>Transaction Type</Form.Label>
        <Form.Control
          as="select"
          value={transactionType}
          onChange={(e) =>{

           setTransactionType(e.target.value as TransactionType);
           if(transactionType===TransactionType.DEPOSIT){
            setToAccount(account);
           }
           if(transactionType===TransactionType.WITHDRAWAL){
            setFromAccount(account);
           }
           if(transactionType===TransactionType.TRANSFER){
            setFromAccount(account);
            setToAccount(account);
           }
          
        }}
        required>
          {Object.values(TransactionType).map((t) => (
            <option key={t} value={t}>
              {TransactionType[t]}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
{ (transactionType === TransactionType.TRANSFER || transactionType === TransactionType.WITHDRAWAL) &&
      <Form.Group controlId="fromAccount">
        <Form.Label>From Account</Form.Label>
        <Form.Control
          as="select"
          value={fromAccountNumber}
          onChange={(e) => {
            setFromAccountNumber(e.target.value);
            setFromAccount(accounts.find((a) => a.number === e.target.value));
          }}
          required={(transactionType === TransactionType.TRANSFER || transactionType === TransactionType.WITHDRAWAL)}
         
        >
          {accounts.map((account: Account) => {
            return (
              <option key={account.number} value={account.number!}>
                {account.customer?.firstName +
                  " " +
                  account.customer?.lastName +
                  " | " +
                  getName(account.type) +
                  " | " +
                  account.number 
                +" "}

                 { (account.financialProducts?.map((fp:FinancialProduct)=>(
                    fp.name == "Balance" && 
                      "$" + String((fp as Balance).amount!.toFixed(2)) || ""
                    
                  )))
                 }
                 </option>
          )
          
          }
                  
                 
                
              
            
                
        
          )}
        </Form.Control>
      </Form.Group>
} 

      { (transactionType === TransactionType.TRANSFER || transactionType === TransactionType.DEPOSIT) && 
      <Form.Group controlId="toAccount">
        <Form.Label>To Account</Form.Label>
        <Form.Control
          as="select"
          value={toAccountNumber}
          onChange={(e) => {
            setToAccountNumber(e.target.value);

            accounts.forEach((account: Account) => {
              if (account.number === e.target.value) {
                setToAccount(account);
              }
            });
          }}
          required={(transactionType === TransactionType.TRANSFER || transactionType === TransactionType.DEPOSIT)}
        
        >


          {accounts.map((account: Account) => {
            return (
              <option key={account.number} value={account.number!}>
                {account.customer?.firstName +
                  " " +
                  account.customer?.lastName +
                  " | " +
                  getName(account.type) +
                  " | " +
                  account.number
                  +" "}

                 { (account.financialProducts?.map((fp:FinancialProduct)=>(
                    fp.name == "Balance" && 
                      "$" + String((fp as Balance).amount!.toFixed(2)) || ""
                    
                  )))
                 }
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
}

      <Form.Group controlId="formAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Modal.Body>
    </Modal>
    </Container>
  );
};

export default TransactionForm;
