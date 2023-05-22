
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

// Define the types for the account fields
type AccountType = "checking" | "savings" | "credit";
type AccountStatus = "active" | "inactive" | "closed";
type Account = {
  type: AccountType;
  status: AccountStatus;
  customer: string;
  agent: string;
  uuid: string;
  pk: number;
  date: string;
  balance: number;
  rate: number;
};

// Define the props for the component
type Props = {
  show: boolean; // Whether the modal is shown or not
  onHide: () => void; // A function to hide the modal
  account: Account; // The account to edit
};

// Define the component
const EditAccountForm = (props: Props) => {
  // Use state hooks to store the form values
  const [type, setType] = useState<AccountType>(props.account.type);
  const [status, setStatus] = useState<AccountStatus>(props.account.status);
  const [customer, setCustomer] = useState<string>(props.account.customer);
  const [agent, setAgent] = useState<string>(props.account.agent);
  const [uuid, setUuid] = useState<string>(props.account.uuid);
  const [pk, setPk] = useState<number>(props.account.pk);
  const [date, setDate] = useState<string>(props.account.date);
  const [balance, setBalance] = useState<number>(props.account.balance);
  const [rate, setRate] = useState<number>(props.account.rate);

  // Define a function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser behavior
    // Create an object with the updated account values
    const updatedAccount: Account = {
      type,
      status,
      customer,
      agent,
      uuid,
      pk,
      date,
      balance,
      rate,
    };
    // Make a PUT request to the API endpoint with the account pk and the updated account object
    axios
      .put(`https://example.com/api/accounts/${pk}`, updatedAccount)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        alert("Account updated successfully");
        props.onHide(); // Hide the modal
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        alert("An error occurred while updating the account");
      });
  };

  // Return the JSX element for the modal form
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value as AccountType)}
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Account Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value as AccountStatus)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="customer">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="agent">
            <Form.Label>Bank Agent Name</Form.Label>
            <Form.Control
              type="text"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="uuid">
            <Form.Label>UUID</Form.Label>
            <Form.Control
              type="text"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="pk">
            <Form.Label>PK</Form.Label>
            <Form.Control
              type="number"
              value={pk}
              onChange={(e) => setPk(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date Created</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountForm;