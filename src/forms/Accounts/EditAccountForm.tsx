import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../types/AccountStatus";
import { useEffect, useState } from "react";
import AccountType, {
  getAccountTypes,
  getName,
  getType,
} from "../../types/AccountType";

import { createAccount } from "../../services/AccountService";
import Account from "../../types/Account";
import Customer from "../../types/Customer";
import Employee from "../../types/Employee";
import { number } from "yup";
import { UsState } from "../../types/UsState";
import User from "../../types/User";
import Role from "../../types/Role";
import { CustomerDto, UserDto, getCustomers, getEmployees } from "../../services/UserService";

function EditAccountForm(props: { account: Account }) {
  const [account, setAccount] = useState<Account>(
    props.account
  );
  const [accountType, setAccountType] = useState<AccountType>(account.type);
  const [accountN, setAccountN] = useState<string>(account.number!);
  const [pk, setPk] = useState<number| null>();
  const [balance, setBalance] = useState<number>(account.balance);
  const [agentId, setAgentId] = useState<string|undefined>(account.bankAgent?.id);
  const [customerId, setCustomerId] = useState<string|undefined>(account.customer?.id);
  const [customers, setCustomers] = useState<Array<UserDto>>([]);
  const [employees, setEmployees] = useState<Array<UserDto>>([]);
  const [show, setShow] = useState(false);
  const [customer,setCustomer] = useState<UserDto|null>(null);
  const [employee,setEmployee] = useState<UserDto|null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>(
    AccountStatus.OPEN
  );
  const baseURL = 'http://localhost:8080/accounts-api/accounts';

  // Create an Axios instance with the base URL
  const api = axios.create({
    baseURL,headers:{'Access-Control-Allow-Origin': '*'}}
  );
  useEffect(() => {

   const fetchUsers = ()=>{

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
    }
    fetchUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account: Account = {
      pk:pk,
      number:accountN,
      type: accountType,
      status: accountStatus,
      customer: customer,
      bankAgent:employee,
      
      
      dateCreated:null,

      balance: balance,
    
    
    };
    api.put(`http://localhost:8080/accounts-api/accounts/${account.pk}`, account)
      .then((res) => {
        console.log(res);
        alert("Account updated successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while updating the account");
      });
      handleClose();

      window.location.reload();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Button variant="link" onClick={handleShow}>
        Edit Account
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={accountType}
                onChange={(e) => setAccountType(getType(e.target.value))}
                disabled
              >
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
           
           
            <Button variant="primary m-2" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default EditAccountForm;
