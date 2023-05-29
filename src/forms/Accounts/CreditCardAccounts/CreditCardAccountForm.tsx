import { Button, Form } from "react-bootstrap";
import axios from "axios";
import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../../types/AccountStatus";
import { useEffect, useState } from "react";
import AccountType, { getAccountTypes } from "../../../types/AccountType";

import Account from "../../../types/Account";
import { UserDto } from "../../../services/UserService";

function CreditCardAccountForm() {
  const [balance, setBalance] = useState<number>(0);

  const [dateCreated] = useState<Date>(new Date());
  const [type] = useState<AccountType>(AccountType.CREDIT_CARD);
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.OPEN);
  const [customers, setCustomers] = useState<UserDto[]>([]);
  const [employees, setEmployees] = useState<UserDto[]>([]);
  const [customer, setCustomer] = useState<UserDto | null>(null);
  const [employee, setEmployee] = useState<UserDto | null>(null);
  const [agentId, setAgentId] = useState<string>();
  const [customerId, setCustomerId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  
  // Create an Axios instance with the base URL
  const api = axios.create({
  
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
     
        api.get(
          "http://localhost:8080/accounts-api/users"
        ).then((response) => {
        setCustomers(response.data.filter((usr: UserDto) => usr.role === 3));
        setEmployees(response.data.filter((usr: UserDto) => usr.role === 2 || usr.role === 1));
    
      }).catch ((error)=> {
        console.error(error);
      });
      setLoading(false);
    };
    fetchUsers();
  }, []);
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dateCreated.setFullYear(dateCreated.getFullYear() + 30);
    const account: Account = {
      type: type,
      status: status,
      customer: customer,
      bankAgent: employee,
      dateCreated: dateCreated,

      balance: balance,

    };
    api
      .post("http://localhost:8080/accounts-api/accounts", account)
      .then((res) => {
        console.log(res);
        alert("Account created successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the account");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="type">
        <Form.Label>Account Type</Form.Label>
        <Form.Control as="select" value={type} disabled={true}>
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
          defaultValue={customer?.id}
          onChange={(e) => {
            setCustomerId(e.target.value);
            customers.forEach((cust: UserDto) => {
              if (cust.id === e.target.value) {
                setCustomer(cust);
                
              }
            });
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
          defaultValue={employee?.id}
          onChange={(e) => {
            setAgentId(e.target.value);
            for (let i = 0; i < employees.length; i++) {
              if (employees[i].id === e.target.value) {
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
  );
}
export default CreditCardAccountForm;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
