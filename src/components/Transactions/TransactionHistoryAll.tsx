import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import Transaction from "../../types/Transaction";
import axios from "axios";
import TransactionType from "../../types/TransactionType";
import TransactionFormGeneral from "../../forms/Transactions/TransactionFormGeneral";

const TransactionHistoryAll: React.FC = () => {
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <TransactionFormGeneral />
        </tr>
        <tr>
          <th>Transaction Type</th>
          <th>From </th>
          <th>To </th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.pk}>
            <td>Transaction Type: {TransactionType[transaction.category!]}</td>
            {(transaction.fromAccount && (
              <td>
                {transaction.fromAccount.number}{" "}
                {transaction.fromAccount.customer!.firstName}{" "}
                {transaction.fromAccount.customer!.lastName}
              </td>
            )) || <td>N/A </td>}
            {(transaction.toAccount && (
              <td>
                {transaction.toAccount.number}{" "}
                {transaction.toAccount.customer!.firstName}{" "}
                {transaction.toAccount.customer!.lastName}
              </td>
            )) || <td>N/A </td>}

            <td>{transaction.amount}</td>
            <td>
              {(transaction.date &&
                transaction.date.toString().substring(0, 10)) ||
                "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionHistoryAll;
