import { Button, Modal } from "react-bootstrap";
import User from "../../types/User";
import { Dispatch, SetStateAction, useState } from "react";
import useDeletionConfirmation from "../../hooks/useDeletionConfirmation";
import UserService, { UpdateDto } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import AccountStatus from "../../types/AccountStatus";
import FormComponent from "../FormComponent";
import { FormData } from "../FormComponent";
import * as Yup from "yup";
import { phoneRegEx, zipCodeRegEx } from "../../helpers/regex";

interface UserActionsProps {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserActions = ({ user, setUser }: UserActionsProps) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const api = UserService.getInstance();

  const { deleteModal, openDeleteModal, setDeleteCallback } =
    useDeletionConfirmation(
      user.lastName,
      "Enter user's last name to confirm deletion"
    );

  setDeleteCallback(() => {
    return api.deleteUser(user).then(() => {
      navigate(`/users/${user.role.name.toLowerCase()}s`);
    });
  });

  const handleEdit = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const editFormData: FormData = {
    fields: [
      {
        name: "firstName",
        displayName: "First Name",
        initValue: user.firstName,
        type: "text",
      },
      {
        name: "lastName",
        displayName: "Last Name",
        initValue: user.lastName,
        type: "text",
      },
      {
        name: "email",
        displayName: "Email",
        initValue: user.email,
        type: "email",
      },
      {
        name: "phone",
        displayName: "Phone",
        initValue: user.phone,
        type: "tel",
      },
      {
        name: "street1",
        displayName: "Street",
        initValue: user.address.street1,
        type: "text",
      },
      {
        name: "street2",
        displayName: "Apt, Suite, Etc.",
        initValue: user.address.street2,
        type: "tel",
      },
      {
        name: "city",
        displayName: "City",
        initValue: user.address.city,
        type: "text",
      },
      {
        name: "state",
        displayName: "State",
        initValue: user.address.state,
        type: "state",
      },
      {
        name: "zipCode",
        displayName: "Zip Code",
        initValue: user.address.zipCode,
        type: "text",
      },
      {
        name: "id",
        displayName: "id",
        initValue: user.id,
        type: "hidden",
      },
    ],
    validation: Yup.object().shape({
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
    }),
    onSubmit: (vals: UpdateDto, setFieldError: Function): Promise<any> => {
      const uU = user.copy({ ...vals });
      let promise: Promise<User | void>;

      promise = (
        user.role.name === "customer"
          ? api.updateCustomer(uU)
          : api.updateEmployee(uU)
      )
        .then((user) => {
          setUser(user);
          setShow(false);
        })
        .catch((errors: any) => {
          errors.forEach((error: any) => {
            if (error.includes("email already exists")) {
              setFieldError("email", "Email already registered");
            }
          });
        });

      return promise;
    },
  };

  const editModal: JSX.Element = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editing User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormComponent formData={editFormData} />
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <div className="float-end mt-3">
        <Button className="me-2" onClick={handleEdit}>
          Edit Account
        </Button>
        <Button
          variant="danger"
          disabled={user.status == AccountStatus.CLOSED}
          onClick={
            openDeleteModal as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          Close Account
        </Button>
      </div>
      {editModal}
      {deleteModal}
    </>
  );
};

export default UserActions;
