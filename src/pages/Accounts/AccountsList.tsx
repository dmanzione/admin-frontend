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
  ListGroup,
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



  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
       
          <ListGroup>
              {accounts.map((account) => (
                <ListGroup.Item key={account.pk}>
                  <dt>Account #</dt><dd>{account.number} | {account.type}</dd>
                  <dt>Customer</dt><dd>
                    {account.customer
                      ? `${account.customer.firstName} ${account.customer.lastName}`
                      : "N/A"}
                  </dd>
                  <dt>Status</dt><dd>{account.status}</dd>
                  
                 
                </ListGroup.Item>
              ))}
            
          </ListGroup>
        
        </>
      )}
    </>
  );
};

export default AccountsDashboard;
