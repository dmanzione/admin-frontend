import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";

import AccountStatus, {
  getAllAccountStatuses,
  getStatus,
} from "../../types/AccountStatus";
import React, { FC, useEffect, useState } from "react";
import AccountType, { getAccountTypes } from "../../types/AccountType";

import Account from "../../types/Account";

import  User  from "../../types/User";
import { type } from "@testing-library/user-event/dist/type";
import Balance from "../../types/Balance";

interface EditAccountFormProps {
  account: Account;
}

const EditAccountForm = (props: EditAccountFormProps) => {
  const [account, setAccount] = useState(props.account);
  const [customers, setCustomers] = useState<User[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [balance, setBalance] = useState<Balance>(new Balance());

  const api = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          "http://localhost:8080/accounts-api/users"
        );
        setCustomers(
          response.data.filter(
            (usr: User) => usr.role === 3 || usr.role === 1
          )
        );
        setEmployees(response.data.filter((usr: User) => usr.role === 2));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api
      .put("http://localhost:8080/accounts-api/accounts/" + account.pk, account)
      .then((res) => {
        console.log(res);
        alert("Account updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while creating the account");
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, [e.target.id]: e.target.value });
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
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Account Type</Form.Label>
              <Form.Control as="select" value={account.type} id="type">
                {getAccountTypes().map((type: AccountType) => (
                  <option key={type} value={type}>
                    {AccountType[type]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Account Status</Form.Label>
              <Form.Control
                as="select"
                value={account.status}
                onChange={handleChange}
                id="status"
              >
                {getAllAccountStatuses().map((status: AccountStatus) => (
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
                value={account.customer?.id}
                id="customer"
                onChange={(e) => {
                  customers.forEach((cust: User) => {
                    if (cust.id === e.target.value) {
                      setAccount({ ...account, customer: cust });
                    }
                  });
                }}
                required
              >
                <option
                  selected
                  key={account.customer?.id}
                  value={account.customer?.id}
                >
                  {account.customer?.firstName +
                    " " +
                    account.customer?.lastName}
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bankAgent">
              <Form.Label>Bank Agent Name</Form.Label>
              <Form.Control
                as="select"
                value={account.bankAgent?.id}
                id="bankAgent"
                onChange={(e) => {
                  for (let i = 0; i < employees.length; i++) {
                    if (employees[i].id === e.target.value) {
                      setAccount({ ...account, bankAgent: employees[i] });
                    }
                  }
                }}
                required
              >
                <option
                  selected
                  key={account.bankAgent?.id}
                  value={account.bankAgent?.id}
                >
                  {account.bankAgent?.firstName +
                    " " +
                    account.bankAgent?.lastName}
                </option>

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
                value={balance.amount}
                onChange={(e) =>
                  setBalance({ ...balance, amount: Number(e.target.value) })
                }
                id="balance"
              />
            </Form.Group>

            <Button variant="primary m-2" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default EditAccountForm;
