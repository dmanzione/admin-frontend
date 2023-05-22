import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import LoanType from "../../types/LoanType";
import Account from "../../types/Account";






const LoanForm = () => {
  const [show, setShow] = useState(false);
  const [loan, setLoan] = useState({
    principal: 0,
    rate:(10),
    initialAmount: 0,
    loanTerm: 0,
    dueDate: new Date(),
    startDate: new Date(),
    loanType: LoanType.PERSONAL_LOAN,
    owner: {},
    loanId: "234234234",
    pk:(Math.random().toFixed(3))

  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/loans", loan)
      .then((res) => {
        console.log(res.data);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Apply for a loan
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Application Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="principal">
              <Form.Label>Principal</Form.Label>
              <Form.Control
                type="number"
                name="principal"
                value={loan.principal}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="interestRate">
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control
                type="number"
                name="interestRate"
                value={loan.rate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="initialAmount">
              <Form.Label>Initial Amount</Form.Label>
              <Form.Control
                type="number"
                name="initialAmount"
                value={loan.initialAmount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="loanTerm">
              <Form.Label>Loan Term</Form.Label>
              <Form.Control
                type="number"
                name="loanTerm"
                value={loan.loanTerm}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={loan.dueDate.toISOString().slice(0, 10)}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={loan.startDate.toISOString().slice(0, 10)}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoanForm;