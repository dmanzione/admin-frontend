import { Container } from "react-bootstrap";
import NewUserTitle from "../../components/UserAccounts/NewPage/NewUserTitle";
import FormComponent from "../../components/FormComponent";
import { NewCustomerYup } from "../../validation/UserValidation";
import { newUserForm } from "../../forms/UserAccount/userForms";
import UserService from "../../services/UserServiceJames";
import User from "../../types/User";
import { useNavigate } from "react-router-dom";

const NewCustomerPage = () => {
  const api = UserService.getInstance();
  const nav = useNavigate();

  const formData = {
    fields: newUserForm(),
    validation: NewCustomerYup,
    onSubmit: (vals: any, setFieldError: Function) => {
      return api
        .createCustomer(vals)
        .then((user: User) => {
          nav("/users/customers/" + user.id);
        })
        .catch((errors: any) => {
          errors.forEach((error: any) => {
            if (error.includes("email already exists")) {
              setFieldError("email", "Email already registered");
            }
          });
        });
    },
  };

  return (
    <Container>
      <NewUserTitle title="New Customer Form" />
      <FormComponent formData={formData} />
    </Container>
  );
};

export default NewCustomerPage;
