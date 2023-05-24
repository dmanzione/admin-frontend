import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Container } from 'react-bootstrap';
import axios from 'axios';

import Loan from '../../../types/Loan';
import Account from '../../../types/Account';
import { UserDto } from '../../../services/UserService';
import AccountType, { getAccountTypes, getName, getType } from '../../../types/AccountType';
import AccountStatus, { getAllAccountStatuses, getStatus } from '../../../types/AccountStatus';
import { LoanType } from '../../../types/LoanType';

interface LoanFormProps{
    accountType: AccountType
}

function LoanForm(props: { accountType: AccountType })  {
    const accountType = props.accountType;
    const [loan,setLoan] = useState<Loan>()
    const [showModal, setShowModal] = useState(false);
    const [customerId,setCustomerId] = useState<string>();
    const [agentId,setAgentId] = useState<string>();
    const [account,setAccount] = useState<Account>();
    const [balance, setBalance] = useState<number>();
    const [customer,setCustomer] = useState<UserDto>();
    const [agent,setAgent] = useState<UserDto>();
  const [loanState, setLoanState] = useState<Loan>({
    account:account!,
    dueDate: new Date(),
    initialAmount: 0,
    loanId: null,
    loanTerm: 0,
    loanType: LoanType.AUTO_LOAN,
    pk:null,
    principal:0,
    rate:5,
    startDate: new Date(),

  });
  const [accountState, setAccountState] = useState<Account>(account!);
const [customers, setCustomers] = useState<UserDto[]>([]);
const [employees,setEmployees] = useState<Array<UserDto>>([]);
  const handleLoanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoanState((prevState) => ({ ...prevState, [name]: value }));
  };
  const [accountStatus, setAccountStatus] = useState<AccountStatus>();

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit form data
    loanState.account =  accountState;

    try {
      const response = await api.post(
        'http://localhost:8080/accounts-api/loan-accounts',
         loanState
      );
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
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
return (
    <Container>
  <Button variant="primary" onClick={() => setShowModal(true)}>
  Loan Application
  </Button>
  <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
  <Modal.Title>Loan Form</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form onSubmit={handleSubmit}>
      <h3>Loan</h3>
      <Form.Group controlId="loanId">
        <Form.Label>Loan ID</Form.Label>
        <Form.Control
          type="text"
          name="loanId"
          value={loanState.loanId || ''}
          onChange={handleLoanChange}
        />
      </Form.Group>
      <Form.Group controlId="principal">
        <Form.Label>Principal</Form.Label>
        <Form.Control
          type="number"
          name="principal"
          value={loanState.principal}
          onChange={handleLoanChange}
        />
      </Form.Group>
      <Form.Group controlId="rate">
        <Form.Label>Rate</Form.Label>
        <Form.Control
          type="number"
          name="rate"
          value={loanState.rate}
          onChange={handleLoanChange}
        />
      </Form.Group>
      <Form.Group controlId="initialAmount">
        <Form.Label>Initial Amount</Form.Label>
        <Form.Control
          type="number"
          name="initialAmount"
          value={loanState.initialAmount}
          onChange={handleLoanChange}
        />
      </Form.Group>
      <Form.Group controlId="loanTerm">
        <Form.Label>Loan Term</Form.Label>
        <Form.Control
          type="number"
          name="loanTerm"
          value={loanState.loanTerm}
          onChange={handleLoanChange}
        />
      </Form.Group>
      <h3>Account</h3>
      <Form.Group controlId="number">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          name="number"
          value={accountState.number}
          onChange={handleAccountChange}
        />
      </Form.Group>
      <Form.Group controlId="balance">
        <Form.Label>Balance</Form.Label>
        <Form.Control
          type="number"
          name="balance"
          value={accountState.balance}
          onChange={handleAccountChange}
        />
      </Form.Group>
      
            <Form.Group controlId="type">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={accountType}
                
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
                      setAgent(employees[i]);
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>
    </Modal.Footer>

    </Modal>
    </Container>
  );
};

export default LoanForm;
