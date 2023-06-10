import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

import Transaction from "../../types/Transaction";
import axios from "axios";
import TransactionType from "../../types/TransactionType";
import TransactionFormGeneral from "../../forms/Transactions/TransactionFormGeneral";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const api = axios.create({
    baseURL: `http://localhost:8080/accounts-api/transactions/`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // 'Authorization': `Bearer ${account.token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers",
    },
  });

  useEffect(() => {
    api
      .get("")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ListGroup>
     
      <ListGroup.Item>
        <strong>Transaction Type</strong> | <strong>From</strong> |{" "}
        <strong>To</strong> | <strong>Amount</strong> | <strong>Date</strong>
      </ListGroup.Item>
      {transactions.map((transaction) => (
        <ListGroup.Item key={transaction.pk}>
          Transaction Type: {TransactionType[transaction.category!]} |{" "}
          {(transaction.fromAccount && (
            <>
              {transaction.fromAccount.number}{" "}
              {transaction.fromAccount.customer!.firstName}{" "}
              {transaction.fromAccount.customer!.lastName}
            </>
          )) || <>N/A </>}
          |{" "}
          {(transaction.toAccount && (
            <>
              {transaction.toAccount.number}{" "}
              {transaction.toAccount.customer!.firstName}{" "}
              {transaction.toAccount.customer!.lastName}
            </>
          )) || <>N/A </>}
          | {transaction.amount} |{" "}
          {(transaction.date &&
            transaction.date.toString().substring(0, 10)) ||
            "N/A"}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TransactionList;