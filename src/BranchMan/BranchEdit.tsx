import { Button, Form, FormGroup, FormLabel, FormControl, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap"

import Branch from "./Branch"

export default function BranchEdit(props: {closeFun: () => void, branch: Branch}) {
    const curr = props.branch;
    
    return (
        <Modal show={true}>
            <ModalTitle className="ms-3 my-3">Editing branch</ModalTitle>
            <ModalBody>
                <Form>
                    <FormGroup className="mb-3" controlId="BName">
                        <FormLabel>Name</FormLabel>
                        <FormControl defaultValue={curr.name}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BStr1">
                        <FormLabel>Address 1</FormLabel>
                        <FormControl defaultValue={curr.address.addL1}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BStr2">
                        <FormLabel>Address 2</FormLabel>
                        <FormControl defaultValue={curr.address.addL2}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BCity">
                        <FormLabel>City</FormLabel>
                        <FormControl defaultValue={curr.address.city}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BState">
                        <FormLabel>State</FormLabel>
                        <FormControl defaultValue={curr.address.state}/>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="BZip">
                        <FormLabel>Zip</FormLabel>
                        <FormControl defaultValue={String(curr.address.zip)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.closeFun} variant="secondary">cancel</Button>
                <Button onClick={props.closeFun} variant="primary">confirm</Button>
            </ModalFooter>
        </Modal>
    )
}