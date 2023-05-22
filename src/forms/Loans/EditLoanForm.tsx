import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { LoanType } from "../../types/LoanType";
import Loan from "../../types/Loan";
import { useParams } from "react-router-dom";
import { getLoanByPk } from "../../services/LoanService";
import { number } from "yup";

const EditLoanForm: React.FC = () => {
  const { pk } = useParams();
  
  
  useEffect(() => {
    getLoanByPk(Number(pk)).then((res)=>{
      const loan:Loan = res;
      setEditedLoan(loan);
      console.log(res);
    }).catch((err)=>{
      console.error(err);
    });
    
  },[])
  const [show, setShow] = useState(false);
  const [editedLoan, setEditedLoan] = useState<Loan>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setEditedLoan({...editedLoan, [e.target.name]: e.target.value });
  };

  const onUpdate = (e: Event)=>{
    e.preventDefault();

    
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://localhost:8080/accounts-api/loan-accounts/${pk}`,
        editedLoan
      );
      onUpdate(response.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="principal">
              <Form.Label>Principal</Form.Label>
              <Form.Control
                type="number"
                name="principal"
                value={editedLoan!.principal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="interestRate">
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control
                type="number"
                name="interestRate"
                value={editedLoan!.rate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="initialAmount">
              <Form.Label>Initial Amount</Form.Label>
              <Form.Control
                type="number"
                name="initialAmount"
                value={editedLoan!.initialAmount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="loanTerm">
              <Form.Label>Loan Term</Form.Label>
              <Form.Control
                type="number"
                name="loanTerm"
                value={editedLoan!.loanTerm}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={editedLoan!.dueDate.toDateString()}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={editedLoan!.startDate.toDateString()}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="loanType">
              <Form.Label>Loan Type</Form.Label>
              <Form.Control
                as="select"
                name="loanType"
                value={editedLoan!.loanType}
                onChange={handleChange}
              >
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="mortgage">Mortgage</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
onchange = (event: any) => {

  event.preventDefault();

}
export default EditLoanForm;