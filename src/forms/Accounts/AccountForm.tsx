import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountStatus,{getStatus} from "../../types/AccountStatus";
import { useState } from "react";
import AccountType, {getType} from "../../types/AccountType";
import { Account } from "../../components/Accounts/Account";
 
const EditAccountForm = (props: {
  show: boolean | undefined; account: { type: AccountType | (() => AccountType); status: AccountStatus | (() => AccountStatus); customer: string | (() => string); agent: string | (() => string); accountN: string | (() => string); pk: number | (() => number); balance: number | (() => number); rate: number | (() => number); dueDate: Date | (() => Date); startDate: Date | (() => Date); }; onHide: (() => void)   
}) => {
  // Use state hooks to store the form values
  const [accountType, setAccountType] = useState<AccountType>(
    props.account.type
  );
  const [accountStatus, setAccountStatus] = useState<AccountStatus>(
    props.account.status
  );
  const [customer, setCustomer] = useState<string>(props.account.customer);
  const [bankAgent, setBankAgent] = useState<string>(props.account.agent);
  const [accountN, setAccountN] = useState<string>(props.account.accountN);
  const [pk, setPk] = useState<number>(props.account.pk);
  const [balance, setBalance] = useState<number>(props.account.balance);
  const [rate, setRate] = useState<number>(props.account.rate);
  const [dueDate, setDueDate] = useState<Date>(props.account.dueDate);
  const [startDate, setStartDate] = useState<Date>(props.account.startDate);
  // Define a function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser behavior
    // Create an object with the updated account values
    const updatedAccount: Account = {
      accountType,
      accountStatus,
      customer,
      bankAgent,
      accountN,
      pk,
      startDate,
      dueDate,
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
        (props!==undefined) && props.onHide();
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
              value={accountType}
              onChange={(e) => setAccountType(getType(e.target.value))}
            >
              <option value={AccountType.CHECKING}>Checking</option>
              <option value={AccountType.SAVINGS}>Savings</option>
              <option value={AccountType.CREDIT_CARD}>Credit</option>
              <option value={AccountType.LOAN}>Loan</option>

            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Account Status</Form.Label>
            <Form.Control
              as="select"
              value={accountStatus}
              onChange={(e) => setAccountStatus(getStatus(e.target.value))}
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
              value={bankAgent}
              onChange={(e) => setBankAgent(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="uuid">
            <Form.Label>UUID</Form.Label>
            <Form.Control
              type="text"
              value={accountN}
              onChange={(e) => setAccountN(e.target.value)}
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
const AccountForm = () => {
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState<Account>({
    accountType: AccountType.SAVINGS,
    accountStatus: AccountStatus.OPEN,
    customer: "",
    bankAgent: "",
    accountN: "",
    pk: 0,
    startDate: new Date(),
    dueDate: new Date(),
    balance: 0,
    rate: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/accounts", account)
      .then((res) => {
        console.log(res.data);
        alert("Account created successfully!");
        handleClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong!");
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Open Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="accountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                name="accountType"
                value={account.accountType}
                onChange={handleChange}
              >
                <option value={AccountType.SAVINGS}>Savings</option>
                <option value={AccountType.CHECKING}>Checking</option>
                <option value={AccountType.CREDIT_CARD}>Credit</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="customer">
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                name="customer"
                value={account.customer}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="bankAgent">
              <Form.Label>Bank Agent</Form.Label>
              <Form.Control
                type="text"
                name="bankAgent"
                value={account.bankAgent}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="balance">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                name="balance"
                value={account.balance}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rate">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                name="rate"
                value={account.rate}
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
const AccountsDashboard = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/accounts">Accounts</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/accounts/new">Apply for loan</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">
                Link
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-primary" type="button">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
export default AccountForm;
