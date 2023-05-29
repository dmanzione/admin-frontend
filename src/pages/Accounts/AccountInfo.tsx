import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Account from '../../types/Account';
import { useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import TransactionForm from '../../forms/Transactions/TransactionForm';
import TransactionHistory from '../../components/Transactions/TransactionHistory';
import FinancialProduct from '../../types/FinancialProduct';
import Card from '../../types/Card';
import Loan from '../../types/Loan';
import Reward from '../../types/Reward';
const useAccountId = () => {
   
    const accountId = useParams().accountId;
    return accountId;
};

const AccountInfo = () => {
    const [account, setAccount] = useState<Account>();
    const accountId = useAccountId();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [reward, setReward] = useState<Reward[]>([]);

    const [financialProducts, setFinancialProducts] = useState<FinancialProduct[]>([]);
    const api = axios.create({
        headers: {
            'Access-Control-Allow-Origin': '*',
        }});
    useEffect(() => {

      let accountPk:number;
                
                api.get(`http://localhost:8080/accounts-api/accounts/${accountId}`).then(response => {
                    
                setAccount(response.data);
                 accountPk = account?.pk!;
               

                }).catch(err=>{
                    console.log(err);
                })
               
                api.get(`http://localhost:8080/accounts-api/financial-products`).then(prods=>{
              
                console.log(prods.data);
                
                let filtered = prods.data.filter((prod:FinancialProduct)=>prod!.account?.pk === accountPk);
                setFinancialProducts(filtered);
                for(let i = 0;i<filtered.length;i++){
                   
                    if(filtered[i].name==='loan'){
                        setLoans(loans=>[...loans, filtered[i] as Loan])
                       
                    }
                    if(filtered[i].name==='card'){
                                                setCards(cards=>[...cards, filtered[i] as Card])
                                               
                                            }
                    if(filtered[i].name==='reward'){
                        setReward(reward=>[...reward, filtered[i] as Reward])
                        
                        console.log(reward);
                       

                    }
                };

                }).catch(err=>{
                    console.log(err);
                })
  
    
    }, []);

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
                {loans.length>0&&(
                    <>                  <h2>Loans</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Loan ID</th>
                                <th>Loan Amount</th>
                                <th>Interest Rate</th>
                                <th>Monthly Payment</th>
                                <th>Term in Months</th>
                                <th>Remaining Balance</th>
                                <th>Payments Made</th>
                                <th>Total Interest</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.pk}>
                                    <td>{loan.pk}</td>
                                    <td>${loan.principalAmount.toFixed(2)}</td>
                                    <td>{loan.interestRate}</td>
                                    <td>{loan.monthlyPayment}</td>
                                    <td>{loan.termInMonths}</td>
                                    <td>{loan.remainingBalance}</td>
                                    <td>
                                        {loan.numberOfPaymentsMade}
                                    </td>
                                    <td>{loan.totalInterestPaid}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </>
                )}
               
            </tbody>
        </Table>
        <TransactionForm  account={account} />
        <TransactionHistory account={account} />
        <Button variant="link" onClick={handleDelete}>Delete Account</Button>

        </div>
        );
};

        export default AccountInfo;