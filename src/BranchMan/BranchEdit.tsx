import { Button, Form, FormGroup, FormLabel, FormControl, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap"
import { useState } from "react"

import Branch from "./Branch"
import BranchService from "./BranchService"

export default function BranchEdit(props: {closeFun: () => void, branch: Branch}) {
    const curr = props.branch

    const [cNam, setName] = useState<string>(curr.name)
    const [cStr1, setStr1] = useState<string>(curr.address.addL1)
    const [cStr2, setStr2] = useState<string>(curr.address.addL2)
    const [cCity, setCity] = useState<string>(curr.address.city)
    const [cState, setState] = useState<string>(curr.address.state)
    const [cZip, setZip] = useState<number>(curr.address.zip)

    function handleClick() {
        BranchService.putBranch({key: curr.key, name: cNam, address: {addL1: cStr1, addL2: cStr2, city: cCity, state: cState, zip: cZip}})
    }

    return (
        <Modal show={true}>
            <ModalTitle className="ms-3 my-3">Editing branch</ModalTitle>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3" controlId="BName">
                        <FormLabel>Name</FormLabel>
                        <FormControl onChange={(e) => setName(e.target.value)} defaultValue={curr.name}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BStr1">
                        <FormLabel>Address 1</FormLabel>
                        <FormControl onChange={(e) => setStr1(e.target.value)} defaultValue={curr.address.addL1}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BStr2">
                        <FormLabel>Address 2</FormLabel>
                        <FormControl onChange={(e) => setStr2(e.target.value)} defaultValue={curr.address.addL2}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BCity">
                        <FormLabel>City</FormLabel>
                        <FormControl onChange={(e) => setCity(e.target.value)} defaultValue={curr.address.city}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BState">
                        <FormLabel>State</FormLabel>
                        <FormControl onChange={(e) => setState(e.target.value)} defaultValue={curr.address.state}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BZip">
                        <FormLabel>Zip</FormLabel>
                        <FormControl onChange={(e) => setZip(Number(e.target.value))} defaultValue={String(curr.address.zip)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.closeFun} variant="secondary">cancel</Button>
                <Button onClick={() => {props.closeFun(); handleClick()}} variant="primary">confirm</Button>
            </ModalFooter>
        </Modal>
    )
}