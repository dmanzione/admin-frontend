import { Field } from "../../components/FormComponent";
import User from "../../types/User";

interface BaseUserFormInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street1?: string;
  street2?: string | null;
  city?: string;
  state?: string;
  zipCode?: string;
}

const baseUserForm = ({
  firstName = "",
  lastName = "",
  email = "",
  phone = "",
  street1 = "",
  street2 = "",
  city = "",
  state = "",
  zipCode = "",
}: BaseUserFormInput): Field[] => {
  return [
    {
      name: "firstName",
      displayName: "First Name",
      initValue: firstName,
      type: "text",
    },
    {
      name: "lastName",
      displayName: "Last Name",
      initValue: lastName,
      type: "text",
    },
    {
      name: "email",
      displayName: "Email",
      initValue: email,
      type: "email",
    },
    {
      name: "phone",
      displayName: "Phone",
      initValue: phone,
      type: "tel",
    },
    {
      name: "street1",
      displayName: "Street",
      initValue: street1,
      type: "text",
    },
    {
      name: "street2",
      displayName: "Apt, Suite, Etc.",
      initValue: street2,
      type: "tel",
    },
    {
      name: "city",
      displayName: "City",
      initValue: city,
      type: "text",
    },
    {
      name: "state",
      displayName: "State",
      initValue: state,
      type: "state",
    },
    {
      name: "zipCode",
      displayName: "Zip Code",
      initValue: zipCode,
      type: "text",
    },
  ];
};

export const updateUserForm = (user: User) => {
  const fields = baseUserForm({ ...user, ...user.address });
  fields.push({
    name: "id",
    displayName: "id",
    initValue: user.id,
    type: "hidden",
  });
  return fields;
};

export const newUserForm = () => {
  return baseUserForm(testUser);
};

const testUser: BaseUserFormInput = {
  firstName: "test",
  lastName: "test",
  email: "test@test.com",
  phone: "1018929101",
  street1: "test",
  street2: "test",
  city: "test",
  state: "VA",
  zipCode: "10187",
};
