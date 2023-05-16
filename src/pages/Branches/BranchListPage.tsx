import { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalTitle } from 'react-bootstrap'

import Branch from '../../types/Branch'
import BranchAdd from '../../components/branch/BranchAdd'
import BranchList from '../../components/branch/BranchList'
import BranchService from '../../services/BranchService'

export default function BranchListPage() {
    const [loading, setLoad] = useState<boolean>(true)
    const [adding, setAdd] = useState<boolean>(false)
    const [spring, setSpring] = useState<Branch[]>([])

    const branchService = BranchService.getInstance();

    const sortBranches = async(s: string, b: boolean) => {
        setSpring(await branchService.sortBranches(s, b))
    }

    const getBranches = async() => {
      branchService.getBranches().then(setSpring)
    }

    useEffect(() => {
      getBranches().then(() => setLoad(false));
    }, [adding])


    const handleClose = (closer: Function) => {
      closer(false)
    }

    if (loading) {
      return <p>Please wait warmly</p>
    }

    return (
      <div>
        <h2 className="m-3">All available branches</h2>
              <Button onClick={() => setAdd(true)} className="mb-3 float-end" variant="primary">Add new</Button>
              <BranchList branches={spring} sorter={sortBranches}/>
        <Modal show={adding} onHide={() => handleClose(setAdd)}>
                  <ModalHeader closeButton><ModalTitle>BranchAdder</ModalTitle></ModalHeader>
                  <BranchAdd closer={setAdd}/>
        </Modal>
      </div>
    )
}