import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UsState } from "../../types/UsState";
import AccountStatus from "../../types/AccountStatus";

interface User {
  pk: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateCreated: Date;
  role: number;
  address: {
    street1: string;
    street2: string | null;
    city: string;
    state: UsState;
    zipCode: string;
  };
  status: AccountStatus;
}

const SignupPage = () => {
  const [user, setUser] = useState<User>({
    pk: 0,
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateCreated: new Date(),
    role: 0,
    address: {
      street1: "",
      street2: null,
      city: "",
      state: UsState.AL,
      zipCode: "",
    },
    status: AccountStatus.OPEN,
  });

  const handleInputChange = (
    event: React.ChangeEvent< HTMLInputElement >
  ) => {
    const { name, value } = event.target;

    if (
      name === "street1" ||
      name === "street2" ||
      name === "city" ||
      name === "state" ||
      name === "zipCode"
    ) {
      setUser((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [name]: value },
      }));
    } else {
      setUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formStreet1">
        <Form.Label>Street 1</Form.Label>
        <Form.Control
          type="text"
          name="street1"
          value={user.address.street1}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formStreet2">
        <Form.Label>Street 2</Form.Label>
        <Form.Control
          type="text"
          name="street2"
          value={user.address.street2 || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={user.address.city}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          name="state"
          value={user.address.state}
          onChange={handleInputChange}
        >
          {Object.values(UsState).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formZipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          name="zipCode"
          value={user.address.zipCode}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignupPage;
