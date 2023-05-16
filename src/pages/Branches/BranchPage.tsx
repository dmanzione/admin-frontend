import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap"

import Branch from "../../types/Branch"
import BranchEdit from "../../components/branch/BranchEdit"
import BranchDel from "../../components/branch/BranchDel"
import BranchService from "../../services/BranchService"

export default function BranchPage() {
    const {id} = useParams()

    const branchService = BranchService.getInstance();

    const [curr, setCurr] = useState<Branch>()
    const [loading, setLoad] = useState<boolean>(true)
    const [editing, setEdit] = useState<boolean>(false)
    const [deleting, setDel] = useState<boolean>(false)
    const nav = useNavigate()

  const handleClose = (closer: Function) => {
        closer(false)
    }

    const showBranch = async () => {
      branchService.getBranch(id!).then((response) => {
        setCurr(response);
        setLoad(false);
      });
    };

  useEffect(() => {
        showBranch()
    }, [])

  const goToBranches = () => {
        nav("/branches")
    }

    if(loading) {
        return <p>Please wait warmly</p>
  }

  return (
    <div>
      <h3>This is {curr!.name}'s page!</h3>
      <br />
      <p>Address:</p>
            {curr!.address.addL2 ? <p>{curr!.address.addL1}, {curr!.address.addL2}</p> :
                <p>{curr!.address.addL1}</p>}
            <p>{curr!.address.city}, {curr!.address.state}, {curr!.address.zip}</p>
            <Button onClick={goToBranches} variant="secondary">Back</Button>
            <Button onClick={() => setEdit(true)} variant="primary">Edit</Button>
            <Button onClick={() => setDel(true)} variant="danger">Delete</Button>
      <Modal show={editing} onHide={() => handleClose(setEdit)}>
                <ModalHeader closeButton><ModalTitle>BranchEditor</ModalTitle></ModalHeader>
                <BranchEdit branch={curr!} closer={setEdit} branchUpdate={setCurr}/>
      </Modal>
      <Modal show={deleting} onHide={() => handleClose(setDel)}>
                <ModalHeader closeButton><ModalTitle>BranchDeleter</ModalTitle></ModalHeader>
                <BranchDel branch={curr!} closer={setEdit}/>
      </Modal>
    </div>
    )
}