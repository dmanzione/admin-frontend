import { Button, Form } from "react-bootstrap";
import axios from "axios";
import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../../types/AccountStatus";
import { useEffect, useState } from "react";
import AccountType, { getAccountTypes } from "../../../types/AccountType";

import Account from "../../../types/Account";
import { UserDto } from "../../../types/UserDto";
import OverdraftProtection from "../../../types/OverdraftProtection";
import FinancialProduct from "../../../types/FinancialProduct";
import { useNavigate } from "react-router-dom";

function CheckingAccountForm() {
  const [balance, setBalance] = useState<number>(0);

  const [dateCreated] = useState<Date>(new Date());
  const [type] = useState<AccountType>(AccountType.CHECKING);
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.OPEN);
  const [customers, setCustomers] = useState<UserDto[]>([]);
  const [employees, setEmployees] = useState<UserDto[]>([]);
  const [customer, setCustomer] = useState<UserDto | null>(null);
  const [employee, setEmployee] = useState<UserDto | null>(null);
  const [agentId, setAgentId] = useState<string>();
  const [customerId, setCustomerId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [overdraftProtection, setOverdraftProtection] = useState<OverdraftProtection>(new OverdraftProtection());
  const api = axios.create({
  
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  const navigate = useNavigate();
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
      deleted:false,
      financialProducts: new Array<FinancialProduct>(overdraftProtection),
     
    };
    api
      .post("http://localhost:8080/accounts-api/accounts", account)
      .then((res) => {
        console.log(res);
        alert("Account created successfully");
        navigate("/accounts/"+res.data.pk);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the account" + error);
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
     
      <Form.Group controlId="overdraftProtection">
      
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
      {overdraftProtection.enabled && (
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

      <Button variant="primary m-2" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default CheckingAccountForm;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
