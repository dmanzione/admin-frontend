import { Container } from "react-bootstrap";
import FormComponent from "../../components/FormComponent";
import NewUserTitle from "../../components/UserAccounts/NewPage/NewUserTitle";
import { newUserForm } from "../../forms/UserAccount/userForms";
import UserService from "../../services/UserService";
import { NewEmployeeYup } from "../../validation/UserValidation";
import User from "../../types/User";
import { useNavigate } from "react-router-dom";

const NewEmployeePage = () => {
  const api = UserService.getInstance();
  const nav = useNavigate();

  const formData = {
    fields: newUserForm(),
    validation: NewEmployeeYup,
    onSubmit: (vals: any, setFieldError: Function) => {
      return api
        .createEmployee(vals)
        .then((user: User) => {
          nav("/users/employees/" + user.id);
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
      <NewUserTitle title="New Employee Form" />
      <FormComponent formData={formData} />
    </Container>
  );
};

export default NewEmployeePage;
