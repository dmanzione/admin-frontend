import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Modal } from "react-bootstrap";
import Account from "../../types/Account";
import { getName } from "../../types/AccountType";
import Transaction from "../../types/Transaction";
import TransactionType from "../../types/TransactionType";
import { TransactionStatus } from "../../types/TransactionStatus";

interface TransactionHistoryProps {
  account: Account;
}

const TransactionForm: React.FC<TransactionHistoryProps> = (
  props: TransactionHistoryProps
) => {
  const account: Account = props.account;

  const [fromAccountNumber, setFromAccountNumber] =
    useState<string>("A+123123");
  const [toAccountNumber, setToAccountNumber] = useState<string>("");
  const [fromAccount, setFromAccount] = useState<Account>();
  const [toAccount, setToAccount] = useState<Account>();
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>(new Array<Account>());
  const [show, setShow] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.DEPOSIT
  );
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    TransactionStatus.PENDING
  );
  const baseURL = "http://localhost:8080/accounts-api/";
  const api = axios.create({
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  useEffect(() => {
    api
      .get(baseURL+"accounts")
      .then((res) => {
        setAccounts(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const transaction: Transaction = {
      pk: null,
      fromAccount: fromAccount!,
      toAccount: toAccount!,
      amount: amount,
      date: new Date(),
      status: transactionStatus,
      category: transactionType,
    };

    api
      .post(baseURL+ `transactions/`, transaction)
      .then((res) => {

        alert("Transaction successful: " +res.data.message);
      })
      .catch((err) => {
        alert("There was an error in the transaction: " + err.message);
      });
  };

  return (
    <Container>
    <Button variant="link" onClick={()=>setShow(true)}>
      Initiate Transaction
    </Button>
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Initiate Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFromAccount">
        <Form.Label>From Account</Form.Label>
        <Form.Control
          as="select"
          value={fromAccountNumber}
          onChange={(e) => {
            setFromAccountNumber(e.target.value);
            setFromAccount(accounts.find((a) => a.number === e.target.value));
          }}
        >
          {accounts.map((account: Account) => {
            return (
              <option key={account.number} value={account.number}>
                {account.customer?.firstName +
                  " " +
                  account.customer?.lastName +
                  " | " +
                  getName(account.type) +
                  " | " +
                  account.number }
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formToAccount">
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
        >
          {accounts.map((account: Account) => {
            return (
              <option key={account.number} value={account.number}>
                {account.customer?.firstName +
                  " " +
                  account.customer?.lastName +
                  " | " +
                  getName(account.type) +
                  " | " +
                  account.number}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
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
