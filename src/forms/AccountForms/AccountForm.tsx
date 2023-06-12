import { Button, Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../types/AccountStatus";
import { useEffect, useState } from "react";
import AccountType, { getAccountTypes, getType } from "../../types/AccountType";

import Account from "../../types/Account";
import  User  from "../../types/User";
import Loan from "../../types/Loan";
import FormRange from "react-bootstrap/esm/FormRange";
import { useNavigate } from "react-router-dom";
import React from "react";
import OverdraftProtection from "../../types/OverdraftProtection";
import InterestRate from "../../types/InterestRate";
import Balance from "../../types/Balance";

function AccountForm() {
  const [overdraftProtection, setOverdraftProtection] = useState<OverdraftProtection>(new OverdraftProtection());
  const [interestRate, setInterestRate] = useState<InterestRate>(new InterestRate());
  const [loan, setLoan] = useState<Loan>(new Loan());
  const [balance, setBalance] = useState<Balance>(new Balance());
  const [dateCreated] = useState<Date>(new Date());
  const [type,setType] = useState<AccountType>(AccountType.LOAN);
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.OPEN);
  const [customers, setCustomers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [customer, setCustomer] = useState<User | null>(null);
  const [employee, setEmployee] = useState<User | null>(null);
  const [agentId, setAgentId] = useState<string>();
  const [customerId, setCustomerId] = useState<string>();
  const [, setLoading] = useState<boolean>(false);
  const [termInMonths, setTermInMonths]= useState<number>(30);
  const [principalAmount, setPrincipalAmount] = useState<number>(10000);
  const navigate = useNavigate();
  const api = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      api
        .get("http://localhost:8080/accounts-api/users")
        .then((res) => {
          setCustomers(res.data.filter((usr: User) => usr.role === 3));
       
          setEmployees(
            res.data.filter((usr: User) => usr.role === 2 || usr.role === 1)
          );
          if (customers.length >= 1) {
            setCustomerId(customers[0].id);
            setCustomer(customers[0]);
          }
          if (employees.length >= 1) {
            setAgentId(employees[0].id);
            setEmployee(employees[0]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      setLoading(false);
    };
    fetchUsers();
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dateCreated.setFullYear(dateCreated.getFullYear() + 30);
    
   
    let account: Account = {
      type: type,
      status: status,
      customer: customer,
      bankAgent: employee,
      dateCreated: new Date(),

     
      deleted:false,
      financialProducts: (type === AccountType.LOAN) ? [loan,balance] : (type=== AccountType.CHECKING) ? [overdraftProtection, balance] : (type=== AccountType.SAVINGS) ? [interestRate,balance] : [balance]
    
    };
   
    api
      .post("http://localhost:8080/accounts-api/accounts", account)
      .then((res) => {
       alert("Account created successfully");
       navigate("/accounts/"+res.data.pk);

       
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the account");
        setLoading(false);
        // window.location.reload();
      });
      
    
  
  };
  return (
    <Form onSubmit={handleSubmit} >
      <Form.Text>
         Account
      </Form.Text>
      <Form.Group controlId="type">
        <Form.Label>Account Type</Form.Label>
        <Form.Control as="select" value={type} onChange={(e)=>setType(getType(e.target.value))}>
          {getAccountTypes().map((t) => (
            <option key={t} value={t}>
              {AccountType[t]}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>Account Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(getStatus(e.target.value))}
        >
          {getAllAccountStatuses().map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="customer">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          as="select"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            customers.forEach((cust: User) => {
              if (cust.id === e.target.value) {
                setCustomer(cust);
              }
            });
          }
        
        }
        required={true}
        >
          <option selected></option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="agent">
        <Form.Label>Bank Agent Name</Form.Label>
        <Form.Control
          as="select"
        
          value={agentId}
          onChange={(e) => {
            setAgentId(e.target.value);
            for (let i = 0; i < employees.length; i++) {
              if (employees[i].id === e.target.value) {
                setEmployee(employees[i]);
              
              }
            }
          }}
          
          required={true}
        >
          <option selected></option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName + " " + employee.lastName}
            </option>
          ))}

        </Form.Control>
      </Form.Group>

     
      {type === AccountType.SAVINGS && (
      <FormGroup>
      <Form.Label>Interest Rate</Form.Label>
      <Form.Control
       as="select"
       value={interestRate.interestRate}
       onChange={(e) => setInterestRate({ ...interestRate, interestRate: Number(e.target.value) })}
      >
        {Array.from({ length: 19.5 }, (_,i=2)=> i+0.5).map((pointFive) => (
          <option key={pointFive} value={pointFive}>
            {pointFive}
          </option>
        ))}
      </Form.Control>
      </FormGroup>
      )}
      <Form.Group controlId="balance">
        <Form.Label>Balance</Form.Label>
        <Form.Control
          type="number"
          value={balance.amount}
          onChange={(e) => setBalance({...balance,amount:Number(e.target.value)})}
        />
      </Form.Group>
      <Form.Group controlId="overdraftProtection">
    
      {type === AccountType.CHECKING &&
      <Form.Check>
        <Form.Check.Input
          type="checkbox"
          checked={overdraftProtection.enabled}
          onChange={(e) => {
            setOverdraftProtection({
            ...overdraftProtection,
              enabled: e.target.checked,
            });
          }}
        />
        <Form.Check.Label>Enable Overdraft Protection</Form.Check.Label>
      </Form.Check>
}
      {type === AccountType.CHECKING && overdraftProtection.enabled && (
        <>
          <Form.Label>Overdraft Limit</Form.Label>
          <Form.Control
            type="number"
            value={overdraftProtection.overdraftLimit}
            onChange={(e) => {
              setOverdraftProtection({
              ...overdraftProtection,
                overdraftLimit: Number((e.target.value)||'0'),
              });
            }}
          />
          </>
      )}
        </Form.Group>
        {type === AccountType.LOAN &&(
          <>
      <Form.Text>Loan</Form.Text>

      <Form.Group controlId="principalAmount">
        <Form.Label>Principal Amount</Form.Label>
        <Form.Control
          type="number"
          value={principalAmount}
          onChange={(e) => setPrincipalAmount(Number(e.target.value))}
        />
      </Form.Group>
        
      <Form.Group controlId="termInMonths">
        <Form.Label>Term In Months</Form.Label>
        <Form.Control
          as="select"
          value={termInMonths}
          onChange={(e) => setTermInMonths(Number(e.target.value))}
        >
          {Array.from({ length: 26 }, (_, i) => i + 5).map((fiveYear) => (
            <option key={fiveYear} value={fiveYear}>
              {fiveYear}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <FormGroup>
        <Form.Label>Interest Rate</Form.Label>
        <Form.Control
         as="select"
         value={interestRate.interestRate}
         onChange={(e) => setInterestRate({ ...interestRate, interestRate: Number(e.target.value) })}
        >
          {Array.from({ length: 19.5 }, (_,i)=> i+0.5).map((pointFive) => (
            <option key={pointFive} value={pointFive}>
              {pointFive}
            </option>
          ))}
        </Form.Control>
        </FormGroup>
        </>
        )}
      <Button variant="primary m-2" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default AccountForm;

