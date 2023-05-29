import { Button, Modal } from "react-bootstrap";
import User from "../../../types/User";
import { Dispatch, SetStateAction, useState } from "react";
import useDeletionConfirmation from "../../../hooks/useDeletionConfirmation";
import UserService, { UpdateDto } from "../../../services/UserServiceJames";
import { useNavigate } from "react-router-dom";
import AccountStatus from "../../../types/AccountStatus";
import FormComponent from "../../FormComponent";
import { FormData } from "../../FormComponent";
import { UserUpdateYup } from "../../../validation/UserValidation";
import { updateUserForm } from "../../../forms/UserAccount/userForms";

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
    fields: updateUserForm(user),
    validation: UserUpdateYup,
    onSubmit: (vals: UpdateDto, setFieldError: Function): Promise<any> => {
      const uU = user.copy({ ...vals });
      let promise: Promise<User | void>;

      promise = (
        user.role.name === "CUSTOMER"
          ? api.updateCustomer(uU)
          : api.updateEmployee(uU)
      )
        .then((user) => {
          setUser(user!);
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
