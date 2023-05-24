import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../../types/AccountStatus";
import { useEffect, useState } from "react";
import AccountType, {
  getAccountTypes,
  getName,
  getType,
} from "../../../types/AccountType";

import { createAccount } from "../../../services/AccountService";
import Account from "../../../types/Account";
import Customer from "../../../types/Customer";
import Employee from "../../../types/Employee";
import { number } from "yup";
import { UsState } from "../../../types/UsState";
import User from "../../../types/User";
import Role from "../../../types/Role";
import { CustomerDto, UserDto, getCustomers, getEmployees } from "../../../services/UserService";
import { CreditCardType, getCreditCardType, getCreditCardTypeName,getCreditCardTypes } from "../../../types/CreditCardType";
import CreditCardAccount from "../../../types/CreditCardAccount";

function CreditCardAccountForm(props: { accountType: AccountType }) {
  const [accountType, setAccountType] = useState<AccountType>(
    props.accountType
  );

  const [accountN, setAccountN] = useState<string>("123345567");
  const [accountPk, setAccountPk] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [rate, setRate] = useState<number>(5);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [dateCreated, setDateCreated] = useState<Date>(new Date());
  const [type, setType] = useState<AccountType>(AccountType.CHECKING);
  const [agentId, setAgentId] = useState<string>("E-12345678");
  const [customerId, setCustomerId] = useState<string>("C-12345678");
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.OPEN);
  const [customers, setCustomers] = useState<Array<UserDto>>([]);
  const [employees, setEmployees] = useState<Array<UserDto>>([]);
  const [show, setShow] = useState(false);
  const [customer,setCustomer] = useState<UserDto|null>(null);
  const [employee,setEmployee] = useState<UserDto|null>(null);
  const [owner, setOwner] = useState<CustomerDto>();
  const [paymentDate,setPaymentDate] = useState<Date>(new Date());
  const [creditCardType,setCreditCardType] = useState<CreditCardType>(CreditCardType.STARTER_UNSECURED_CREDIT_CARD);
  const [bankAgent, setBankAgent] = useState<UserDto|null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>(
    AccountStatus.OPEN
  );
  const baseURL = 'http://localhost:8080/accounts-api/accounts';

  // Create an Axios instance with the base URL
  const api = axios.create({
    baseURL,headers:{'Access-Control-Allow-Origin': '*'}}
  );
  useEffect(() => {
   api.get("http://localhost:8080/accounts-api/users")
      .then((res) => {
         
        let customerz:UserDto[] = res.data.filter((usr:UserDto)=>usr.role===3);
        let emps:UserDto[] = res.data.filter((usr:UserDto)=>usr.role===2);
        setCustomers(customerz);
        setEmployees(emps);
            
      })

      .catch((err) => {
       

        console.log(err);
      });
    
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dateCreated.setFullYear(dateCreated.getFullYear()+30)
    const account: Account = {
      type: accountType,
      status: accountStatus,
      customer: customer,
      bankAgent:employee,

      pk:null,
      startDate:dateCreated,

      balance: balance,
      rate: rate,
      number:"02310231203",
      dueDate: dateCreated,
    
    };
    const creditCardAccount:CreditCardAccount ={
        account:account,
        pk:null,
        paymentDate:paymentDate,
        creditCardType:creditCardType
    }
    api.post("http://localhost:8080/accounts-api/creditCardAccounts", account)
      .then((res) => {
        console.log(res);
        alert("Account created successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the account");
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Open New Credit Card Account
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Open New Credit Card Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={accountType}
                onChange={(e) => setAccountType(getType(e.target.value))}
              disabled>
                {getAccountTypes().map((t) => (
                  <option key={t} value={t}>
                    {getName(t)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Account Status</Form.Label>
              <Form.Control
                as="select"
                value={accountStatus}
                onChange={(e) => setAccountStatus(getStatus(e.target.value))}
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
                onChange={e=>{
                  setCustomerId(e.target.value);
                  customers.forEach((cust:UserDto)=>{
                    if(cust.id===e.target.value){
                      setCustomer(cust);
                    }
                  })
                
                }}
              >
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
                  for(let i=0;i<employees.length;i++){
                    if(employees[i].id===e.target.value){
                      setEmployee(employees[i]);
                    }
                  }
              
                }}
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName + " " + employee.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="balance">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="rate">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </Form.Group>
        
            <Form.Group controlId="paymentDate">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={paymentDate.getFullYear()+"-"+paymentDate.getMonth()+"-"+paymentDate.getDate()}
                  onChange={(e) => setPaymentDate(new Date(e.target.value))}
                />
            </Form.Group>

            <Form.Group controlId="creditCardType">
                <Form.Label>Credit Card Type</Form.Label>
                <Form.Control as="select"
                onChange={(e)=> setCreditCardType(getCreditCardType(e.target.value))}>
                    {
                    getCreditCardTypes().map((type)=>{
                  return ( <option key={type} value={type}>
                      {getCreditCardTypeName(type)}
                    </option>
                    )
                })
            }
                </Form.Control>
            </Form.Group>
           
            <Button variant="primary m-2" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default CreditCardAccountForm;
