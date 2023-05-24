import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { LoanType } from "../../types/LoanType";
import { useParams } from "react-router-dom";
import { getLoanByPk } from "../../services/LoanService";
import Loan from "../../types/Loan";
import { Account } from "../Accounts/Account";
import { number } from "yup";
import { UUID, randomUUID } from "crypto";
import AccountStatus from "../../types/AccountStatus";
import AccountType from "../../types/AccountType";
import Customer from "../../types/Customer";
import { UsState } from "../../types/UsState";
import Employee from "../../types/Employee";

/*
 {
        pk: 0,
        firstName: "John",
        lastName: "Doe",
        email: "upchh@example.com",
        phone: "1234567890",
        address: {
          pk: 0,
          street1: "123 Main St",
          street2: null,
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      },
*/
const LoanCard = () => {
  const [loan, setLoan] = useState<Loan>({
    pk: 0,
    loanId: "1d0cf375-7d01-4491-93a3-dc8d4d519d53",
    initialAmount: 500,
    loanType: LoanType.AUTO_LOAN,
    startDate: new Date(),
    dueDate: new Date(),
    principal: 20000,
    loanTerm: 30,
    rate: 10,
    account: {
      pk: 0,
      number: "1d0cf375-7d01-4491-93a3-dc8d4d519d53",
      balance: 10000,
      customer:{pk:0,id:"123123",dateCreated:new Date(),firstName:"John",
         lastName:"Doe",
        email:"upchh@example.com",
        phone:"1234567890",
        address: {
         
          street1: "123 Main St",
          street2: null,
          city: "New York",
          state: UsState.NY,
          zipCode: "10001",
         },status:AccountStatus.OPEN,role:3,
        },
      startDate: new Date(),
      status: AccountStatus.OPEN,
      type: AccountType.CHECKING,
      rate:10,
      bankAgent:{pk:0,id:"123123",dateCreated:new Date(),firstName:"John",
      lastName:"Doe",
     email:"upchh@example.com",
     phone:"1234567890",
     address: {
      
       street1: "123 Main St",
       street2: null,
       city: "New York",
       state: UsState.NY,
       zipCode: "10001",
      },status:AccountStatus.OPEN,role:3
     },
     dueDate:new Date()

    }
   
    
 
    
  });
  let loanInfo: Loan;
  const { pk } = useParams();
  useEffect(() => {
    getLoanByPk(Number(pk))
      .then((res) => {
        setLoan(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Define a function to format the loan type as a badge
  const formatLoanType = (loanType: LoanType) => {
    let variant = "";
    let text = "";
    switch (loanType) {
      case LoanType.MORTGAGE_LOAN:
        variant = "primary";
        text = "Mortgage";
        break;
      case LoanType.PERSONAL_LOAN:
        variant = "success";
        text = "Personal";
        break;
      case LoanType.PAYDAY_LOAN:
        variant = "warning";
        text = "Payday";
        break;
      case LoanType.STUDENT_LOAN:
        variant = "info";
        text = "Student";
        break;

      default:
        variant = "secondary";
        text = "Other";
    }
    return <Badge bg={variant}>{text}</Badge>;
  };

  // Define a function to format the date as a string
  const formatDate = (date: Date) => {
    return String(date);
  };

  // Return the JSX for the card component
  return (
    <Card>
      <Card.Header>
        <Card.Title>Loan Number: {loan!.loanId}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Principal: ${loan!.principal.toFixed(2)}
          <br />
          Interest Rate: {loan!.rate.toFixed(2)}%
          <br />
          Initial Amount: ${loan!.initialAmount.toFixed(2)}
          <br />
          Loan Term: {loan!.loanTerm} months
          <br />
          Due Date: {formatDate(loan!.dueDate)}
          <br />
          Start Date: {formatDate(loan!.startDate)}
          <br />
          Loan Type: {formatLoanType(loan!.loanType)}
          <br />
          Account Number: {loan!.account.number}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LoanCard;
