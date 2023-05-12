import * as Yup from "yup";
import { phoneRegEx, zipCodeRegEx } from "../helpers/regex";

export const UserUpdateYup = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  phone: Yup.string()
    .matches(phoneRegEx, "Invalid phone number")
    .required("Required"),
  street1: Yup.string().required("Required"),
  street2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string().matches(zipCodeRegEx, "Invalid").required("Required"),
});

export const NewCustomerYup = UserUpdateYup.shape({});

export const NewEmployeeYup = UserUpdateYup.shape({});
