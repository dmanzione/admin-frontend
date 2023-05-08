import { Button, Modal, ModalDialog, ModalFooter, ModalTitle } from "react-bootstrap"

import Branch from "./Branch"
import BranchService from "./BranchService"

export default function BranchDel(props: {closeFun: () => void, branch: Branch}) {
    const curr = props.branch

    function handleClick() {
        BranchService.delBranch(curr)
    }

    return (
        <Modal show={true}>
                <ModalTitle className="m-3">Are you sure you want to delete that branch ({curr.name})?</ModalTitle>
                <ModalFooter>
                    <Button onClick={props.closeFun} variant="secondary">cancel</Button>
                    <Button onClick={() => {props.closeFun(); handleClick()}} variant="danger">delete</Button>
                </ModalFooter>
        </Modal>
    )
}