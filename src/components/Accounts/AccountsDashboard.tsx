import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Pagination, Button } from 'react-bootstrap';
import Account from '../../types/Account';
import EditAccountForm from '../../forms/Accounts/EditAccountForm';
import AccountForm from '../../forms/Accounts/SavingsAccounts/SavingsAccountForm';
import AccountType from '../../types/AccountType';
import { Link } from 'react-router-dom';
import LoanForm from '../../forms/Accounts/Loans/LoanForm';
import CheckingAccountForm from '../../forms/Accounts/CheckingAccounts/CheckingAccountForm';
import SavingsAccountForm from '../../forms/Accounts/SavingsAccounts/SavingsAccountForm';
import CreditCardAccountForm from '../../forms/Accounts/CreditCardAccounts/CreditCardAccountForm';

const AccountsDashboard = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Account | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const baseURL = 'http://localhost:8080/accounts-api/accounts';

  // Create an Axios instance with the base URL
  const api = axios.create({
    baseURL,headers:{'Access-Control-Allow-Origin': '*'}}
  );
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await api.get('http://localhost:8080/accounts-api/accounts');
      setAccounts(response.data.content);
      console.log("Accounts:" + accounts)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
 
  };

  const handleSortClick = (field: keyof Account) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }

  };

  let filteredAccounts: Account[] = [];

  if (searchTerm) {
    for(let i=0; i<accounts.length; i++){
        if(Object.values(accounts[i])
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())){
            filteredAccounts.push(accounts[i]);
        }
    }
  } else {
      filteredAccounts = accounts;
  }

  if (sortField) {
    for(let i=0; i<filteredAccounts.length-1; i++){
        for(let j=i+1; j<filteredAccounts.length; j++){
            if(filteredAccounts[i][sortField] !== null && filteredAccounts[j][sortField] !== null){
                if(sortDirection === 'asc'){
                    if(filteredAccounts[i][sortField]! > filteredAccounts[j][sortField]!){
                        let temp = filteredAccounts[i];
                        filteredAccounts[i] = filteredAccounts[j];
                        filteredAccounts[j] = temp;
                    }
                } else {
                    if(filteredAccounts[i][sortField]! < filteredAccounts[j][sortField]!){
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
    <div>
      <h2>Dashboard</h2>
      <div>
        <label htmlFor="searchInput">Search:</label>
        <input id="searchInput" type="text" onChange={handleSearchChange} />
      </div>
      <button onClick={fetchAccounts}>Refresh</button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => handleSortClick('number')}>Account Number</th>
                <th onClick={() => handleSortClick('customer')}>Customer</th>
                <th onClick={() => handleSortClick('startDate')}>Date Created</th>
                <th onClick={() => handleSortClick('balance')}>Balance</th>
                <th onClick={() => handleSortClick('rate')}>Interest Rate</th>
                <th onClick={() => handleSortClick('status')}>Status</th>
                <th onClick={() => handleSortClick('type')}>Type</th>
                <th onClick={() => handleSortClick('bankAgent')}>Bank Agent</th> 
                <th>Actions</th> 
              </tr> 
            </thead> 
            <tbody> 
              {filteredAccounts.map(account => (
                <tr key={account.pk}>
                  <td>{account.number}</td> 
                  <td>{account.customer ? `${account.customer.firstName} ${account.customer.lastName}` : 'N/A'}</td> 
                  <td>{new Date(account.startDate).toLocaleDateString()}</td> 
                  <td>${account.balance.toFixed(2)}</td> 
                  <td>{account.rate}%</td> 
                  <td>{account.status}</td> 
                  <td>{account.type}</td> 
                  <td>{account.bankAgent ? `${account.bankAgent.firstName} ${account.bankAgent.lastName}` : 'N/A'}</td> 
                  <td>
                 

                  <Link to={`/accounts/${account.pk}`}>See</Link>
                  </td> 
                </tr> 
              ))}
            </tbody> 
          </Table> 
        <LoanForm accountType = {AccountType.LOAN}/> 
        <CheckingAccountForm accountType={AccountType.CHECKING}/>
        <SavingsAccountForm accountType={AccountType.SAVINGS}/>
        <CreditCardAccountForm accountType={AccountType.CREDIT}/>
        
        </>
      )}
    </div> 
  );
};

export default AccountsDashboard; 