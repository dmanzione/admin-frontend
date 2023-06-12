import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [usernameError, setUsernameError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(loginData.username)) {
      setUsernameError('Please enter a valid email address');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/login', loginData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            isInvalid={!!usernameError}
          />
          <Form.Control.Feedback type="invalid">{usernameError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p>Don't have an account? Sign up below</p>
      <Link to="/users/new" className="btn btn-secondary">Sign Up</Link>
    </>
  );
};

export default LoginPage;