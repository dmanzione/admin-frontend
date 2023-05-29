import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Account from '../../types/Account';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import EditAccountForm from '../../forms/Accounts/EditAccountForm';
import TransactionForm from '../../forms/Transactions/TransactionForm';
import TransactionHistory from '../../components/Transactions/TransactionHistory';

const useAccountId = () => {
    // Replace this with your logic for retrieving the accountId
    const accountId = useParams().accountId;
    return accountId;
};

const AccountInfo = () => {
    const [account, setAccount] = useState<Account>();
    const accountId = useAccountId();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/accounts-api/accounts/${accountId}`);
                setAccount(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAccount();
    }, [accountId]);

    if (!account) {
        return <p>Loading...</p>;
    }

    const { pk, number, customer, dateCreated, balance, status, type, bankAgent } = account;

    function handleDelete() {
        axios.delete(`http://localhost:8080/accounts-api/accounts/${accountId}`).then((res) => {
            axios.get(`http://localhost:8080/accounts-api/accounts/${accountId}`).then(res => {
                if (res.statusText === "NOT_FOUND") {
                    alert("Account deletion successful")
                } else {
                    alert("Account deletion failed")
                }
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })



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
                    <td>{customer ? `${customer.firstName} ${customer.lastName}` : 'N/A'}</td>
                </tr>
                <tr>
                    <td>Date Created:</td>
                    {(dateCreated && (<td>{dateCreated.toString().substring(0,10)}</td>)|| <td>N/A</td>) }
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
            </tbody>
        </Table>
        <TransactionForm  account={account} />
        <TransactionHistory account={account} />
        <EditAccountForm account={account}></EditAccountForm>
        <Button variant="link" onClick={handleDelete}>Delete Account</Button>

        </div>
        );
};

        export default AccountInfo;