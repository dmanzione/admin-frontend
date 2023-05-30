import React, { useState, useEffect } from "react";
import axios from "axios";
import Account from "../../types/Account";
import { useParams } from "react-router-dom";
import TransactionForm from "../../forms/Transactions/TransactionForm";
import TransactionHistory from "../../components/Transactions/TransactionHistory";
import { Table } from "react-bootstrap";
import AccountType from "../../types/AccountType";

import Loan from "../../types/Loan";
import Card from "../../types/Card";
import Reward from "../../types/Reward";
import FinancialProduct from "../../types/FinancialProduct";

const useAccountId = () => {
  // Replace this with your logic for retrieving the accountId
  const accountId = useParams().accountId;
  return accountId;
};

const AccountInfo = () => {
  const [account, setAccount] = useState<Account>();
  const accountId = useAccountId();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [financialProducts, setFinancialProducts] = useState<
    FinancialProduct[]
  >([]);
  const api = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  useEffect(() => {
    const fetchAccount = async () => {
      axios
        .get(`http://localhost:8080/accounts-api/accounts/${accountId}`)
        .then((response) => {
          setAccount(response.data);

          fetchFinancialProducts();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const fetchFinancialProducts = async () => {
      axios
        .get(
          `http://localhost:8080/accounts-api/accounts/${account!.pk}/products`
        )
        .then((resp) => {
          setFinancialProducts(resp.data);

          // eslint-disable-next-line no-lone-blocks
          {
            financialProducts.map((financialProduct: FinancialProduct) => {
              if (financialProduct.name?.toLowerCase() === "loan") {
                setLoans((loans) => [...loans, financialProduct as Loan]);
              } else if (financialProduct.name?.toLowerCase() === "card") {
                setCards((cards) => [...cards, financialProduct as Card]);
              } else if (financialProduct.name?.toLowerCase() === "reward") {
                setRewards((rewards) => [
                  ...rewards,
                  financialProduct as Reward,
                ]);
              }
            });
          }
        })
        .catch((error) => {
          alert("Error retrieving financial products");
          console.log(error);
        });
    };
    fetchAccount();
  }, []);

  if (!account) {
    return <p>Loading...</p>;
  }

  const {
    pk,
    number,
    customer,
    dateCreated,
    balance,
    status,
    type,
    bankAgent,
  } = account;

  function handleDelete() {
    axios
      .delete(`http://localhost:8080/accounts-api/accounts/${accountId}`)
      .then((res) => {
        axios
          .get(`http://localhost:8080/accounts-api/accounts/${accountId}`)
          .then((res) => {
            if (res.statusText === "NOT_FOUND") {
              alert("Account deletion successful");
            } else {
              alert("Account deletion failed");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h2>Account Information</h2>
      <Table>
        <tbody>
          <tr>
            <td>Account Number:</td>
            <td>{number}</td>
          </tr>
          <tr>
            <td>Customer:</td>
            <td>
              {customer ? `${customer.firstName} ${customer.lastName}` : "N/A"}
            </td>
          </tr>
          <tr>
            <td>Date Created:</td>
            {(dateCreated && (
              <td>{dateCreated.toString().substring(0, 10)}</td>
            )) || <td>N/A</td>}
          </tr>
          <tr>
            <td>Balance:</td>
            <td>${balance.toFixed(2)}</td>
          </tr>

          <tr>
            <td>Status:</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{type}</td>
          </tr>

          {bankAgent && (
            <tr>
              <td>Bank Agent:</td>
              <td>{`${bankAgent.firstName} ${bankAgent.lastName}`}</td>
            </tr>
          )}
          {loans.length > 0 && (
            <tr>
              {" "}
              <td>Loans:</td>
              <td>
                {" "}
                {loans.map((loan: Loan) => {
                  return Object.keys(loan).map((key) => {
                    return (
                      <dl>
                        {" "}
                        <dt>{key}</dt>
                        <dd>loan![key!]</dd>
                      </dl>
                    );
                  });
                })}
              </td>
            </tr>
          )}
          {cards.length > 0 && (
            <tr>
              {" "}
              <td>Cards:</td>
              <td>
                {" "}
                {cards.map((card: Card) => {
                  return Object.keys(card).map((key) => {
                    return (
                      <dl>
                        {" "}
                        <dt>{key}</dt>
                        <dd>card![key!]</dd>
                      </dl>
                    );
                  });
                })}
              </td>
            </tr>
          )}
          {rewards.length > 0 && (
            <tr>
              {" "}
              <td>Rewards:</td>
              <td>
                {" "}
                {rewards.map((reward: Reward) => {
                  return Object.keys(reward).map((key) => {
                    return (
                      <dl>
                        {" "}
                        <dt>{key}</dt>
                        <dd>reward![key!]</dd>
                      </dl>
                    );
                  });
                })}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <TransactionForm account={account} />
      <TransactionHistory account={account} />
    </div>
  );
};

export default AccountInfo;
