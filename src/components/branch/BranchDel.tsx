import { Button, ModalFooter, ModalBody } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import Branch from "../../types/Branch"
import BranchService from "../../services/BranchService"

export default function BranchDel(props: {branch: Branch, closer: Function}) {
    const curr = props.branch
    const closer = props.closer
    const branchService = BranchService.getInstance();

    const nav = useNavigate()

  function handleClick() {
        branchService.delBranch(curr).then(() => nav("/branches"))
        
  }

  return (
    <div>
      <ModalBody>Are you sure you want to delete {curr.name}?</ModalBody>
      <ModalFooter>
                <Button onClick={() => handleClick()} variant="danger">delete</Button>
      </ModalFooter>
    </div>
    )
}