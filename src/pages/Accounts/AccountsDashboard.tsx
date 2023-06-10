import React, { useState, useEffect } from "react";
import axios, { HttpStatusCode } from "axios";
import {
  Table,
  Spinner,
  Pagination,
  Button,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import Account from "../../types/Account";
import { Link, useNavigate } from "react-router-dom";
import { rejects } from "assert";

const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Account | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
 const navigate = useNavigate();

  const api = axios.create({
    
    headers: { "Access-Control-Allow-Origin": "*","Authentication":   "Basic"  },
  });

  const fetchAccounts = async () => {
    setLoading(true);
   
       api.get(
        `http://localhost:8080/accounts-api/accounts?page=${page}&size=10`
      ).then((res) => {

        setAccounts(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      }).catch(err=>{
        console.log("There was an error when attempting to fetch accounts")
        console.log("Error message: " + err.message)
      })
    }

  useEffect(() => {
    fetchAccounts();
  }, [page]);

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page + 1}
        onClick={() => setPage(number - 1)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortClick = (field: keyof Account, subfield?: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    if (subfield) {
      // sort by the specified subfield of the object field
      if (field === "customer") {
        filteredAccounts = [...filteredAccounts].sort((a, b) =>
          sortDirection === "asc"
            ? a.customer!.firstName > b.customer!.firstName
              ? 1
              : -1
            : a.customer!.lastName < b.customer!.lastName
            ? 1
            : -1
        );
      } else if (field === "bankAgent") {
        filteredAccounts = [...filteredAccounts].sort((a, b) =>
          sortDirection === "asc"
            ? a.bankAgent!.firstName > b.bankAgent!.firstName
              ? 1
              : -1
            : a.bankAgent!.lastName < b.bankAgent!.lastName
            ? 1
            : -1
        );
      }
    } else {
      // sort by the specified field
      filteredAccounts = [...filteredAccounts].sort((a, b) =>
        sortDirection === "asc"
          ? a[field]! > b[field]!
            ? 1
            : -1
          : a[field]! < b[field]!
          ? 1
          : -1
      );
    }
  };

  let filteredAccounts: Account[] = [];

  if (searchTerm) {
    for (let i = 0; i < accounts.length; i++) {
      if (
        Object.values(accounts[i])
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        filteredAccounts.push(accounts[i]);
      } else {
        for (let j = 0; j < Object.values(accounts[i]).length; j++) {
          if (Object.values(accounts[i])[j] !== null) {
            if (
              Object.values(Object.values(accounts[i])[j])
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              filteredAccounts.push(accounts[i]);

              break;
            } else {
              for (let k = 0; k < Object.values(accounts[i])[j].length; k++) {
                if (Object.values(accounts[i])[j][k] !== null) {
                  if (
                    Object.values(Object.values(accounts[i]))
                      [j][k].toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    filteredAccounts.push(accounts[i]);

                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {
    filteredAccounts = accounts;
  }
  if (sortField) {
    for (let i = 0; i < filteredAccounts.length - 1; i++) {
      for (let j = i + 1; j < filteredAccounts.length; j++) {
        if (
          filteredAccounts[i][sortField] !== null &&
          filteredAccounts[j][sortField] !== null
        ) {
          if (sortDirection === "asc") {
            if (
              filteredAccounts[i][sortField]! > filteredAccounts[j][sortField]!
            ) {
              let temp = filteredAccounts[i];
              filteredAccounts[i] = filteredAccounts[j];
              filteredAccounts[j] = temp;
            }
          } else {
            if (
              filteredAccounts[i][sortField]! < filteredAccounts[j][sortField]!
            ) {
              let temp = filteredAccounts[i];
              filteredAccounts[i] = filteredAccounts[j];
              filteredAccounts[j] = temp;
            }
          }
        }
      }
    }
  }

  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
        <div className="d-flex justify-content-around border pt-2">
               <Link to="/accounts/new">Open Account</Link>
                <Link to="/accounts/types">See Account Types</Link>
               
                    <label htmlFor="searchInput">
                      Search: &nbsp;&nbsp;
                      <input
                        id="searchInput"
                        type="text"
                        onChange={handleSearchChange}
                      />
                    </label>
                  
                  <Button variant="link" onClick={fetchAccounts}>Refresh</Button>
              </div>
          <Table striped bordered hover className="w-100 justify-content-between">
            <thead className="w-100">
         
            <thead>
            </thead>  

              <tr>
                <th onClick={() => handleSortClick("number")}>
                  Account Number
                </th>
                <th onClick={() => handleSortClick("customer", "subfield")}>
                  Customer
                </th>
                <th onClick={() => handleSortClick("dateCreated")}>
                  Date Created
                </th>

                <th onClick={() => handleSortClick("status")}>Status</th>
                <th onClick={() => handleSortClick("type")}>Type</th>

                <th onClick={() => handleSortClick("bankAgent", "subfield")}>
                  Bank Agent
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.pk}>
                  <td>{account.number}</td>
                  <td>
                    {account.customer
                      ? `${account.customer.firstName} ${account.customer.lastName}`
                      : "N/A"}
                  </td>
                  {(account.dateCreated && (
                    <td>{account.dateCreated.toString().substring(0, 10)}</td>
                  )) || <td>N/A</td>}

                  <td>{account.status}</td>
                  <td>{account.type}</td>
                  <td>
                    {account.bankAgent
                      ? `${account.bankAgent.firstName} ${account.bankAgent.lastName}`
                      : "N/A"}
                  </td>
                  <td>
                    <Link to={`/accounts/${account.pk}`}>See</Link>
                    <br />
                    <Link to={`/accounts/${account.pk}/edit`}>Edit</Link>
                    <br />
                    <Link to={`/accounts/${account.pk}/delete`}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="d-flex justify-content-center">
            {items}
          </Pagination>
        </>
      )}
    </>
  );
};

export default AccountsDashboard;
