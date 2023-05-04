import { Button, Modal, ModalDialog, ModalFooter, ModalTitle } from "react-bootstrap"

import Branch from "./Branch"
export default function BranchDel(props: {closeFun: () => void, branch: Branch}) {
    return (
        <Modal show={true}>
                <ModalTitle>Are you sure you want to delete that branch?</ModalTitle>
                <ModalFooter>
                    <Button onClick={props.closeFun} variant="secondary">cancel</Button>
                    <Button onClick={props.closeFun} variant="danger">delete</Button>
                </ModalFooter>
        </Modal>
    )
}