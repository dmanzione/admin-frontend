import { Button, Modal } from "react-bootstrap";
import User from "../../types/User";
import { useState } from "react";
import useDeletionConfirmation from "../../hooks/useDeletionConfirmation";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import AccountStatus from "../../types/AccountStatus";

interface UserActionsProps {
  user: User;
}

const UserActions = ({ user }: UserActionsProps) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const api = UserService.getInstance();

  const { deleteModal, openDeleteModal, setDeleteCallback } =
    useDeletionConfirmation(
      user.lastName,
      "Enter user's last name to confirm deletion"
    );

  setDeleteCallback(() => {
    return api.deleteUser(user.id, user.role.name).then(() => {
      navigate(`/users/${user.role.name.toLowerCase()}s`);
    });
  });

  const handleEdit = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const editModalContent: JSX.Element = (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
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
      {deleteModal}
    </>
  );
};

export default UserActions;
