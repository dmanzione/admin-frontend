import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";

/**
 *  This hook returns an object containing a modal for deletion confirmation,
 *  a callback to open the modal, and a callback to set the onDelete callback
 *
 *  The modal should be in the return statement of the component using it,
 *  the open callback should be used to show the modal, and the setDelete callback
 *  is required to set the action performed on delete. This callback must return
 *  a promise
 *
 * @param value value that the deletion modal is looking for
 */

const useDeletionConfirmation = (value: string, message: string) => {
  const [field, setField] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField(e.target.value);
  };

  let deleteCallback: Function = () => {
    throw new Error("DELETE CALLBACK NOT SET");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.toLowerCase() !== field.toLowerCase()) {
      setInvalid(true);
      return;
    }
    setSubmitting(true);
    setInvalid(false);
    deleteCallback().finally(() => {
      setSubmitting(false);
      handleClose();
    });
  };

  const handleClose = () => {
    if (submitting) return;
    setShow(false);
  };

  const deleteModal: JSX.Element = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {message}
          <Form.Control
            placeholder={value}
            onChange={handleUpdate}
            value={field}
            disabled={submitting}
            isInvalid={invalid}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" disabled={submitting}>
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );

  const openCallback = () => {
    setField("");
    setShow(true);
  };

  const setDeleteCallback = (cb: () => Promise<any>) => {
    deleteCallback = cb;
  };

  return {
    deleteModal,
    openDeleteModal: openCallback,
    setDeleteCallback,
  };
};

export default useDeletionConfirmation;
