import { ModalBody } from 'react-bootstrap';
import * as Yup from 'yup'

import FormComponent from "../FormComponent";
import { Field } from "../FormComponent";
import Branch from "../../types/Branch";
import { FlatBranch } from '../../types/Branch';
import BranchService from "../../services/BranchService";

export default function BranchEdit(props: {branch: Branch, closer: Function, branchUpdate: Function}, ) {
    const curr = props.branch
    const closer = props.closer

    const branchService = BranchService.getInstance();
  
    const fields: Field[] = 
        [{
      name: "name",
      initValue: curr.name,
      displayName: "Branch Name",
            type: "text"
        },{
      name: "addL1",
      initValue: curr.address.addL1,
      displayName: "Address 1",
            type: "text"
        },{
      name: "addL2",
      initValue: curr.address.addL2 ? curr.address.addL2 : "",
      displayName: "Address 2",
            type: "text"
        },{
      name: "city",
      initValue: curr.address.city,
      displayName: "City",
            type: "text"
        },{
      name: "state",
      initValue: curr.address.state,
      displayName: "State",
            type: "text"
        },{
      name: "zip",
      initValue: curr.address.zip,
      displayName: "Zip Code",
            type: "text"
        }]
    ;

  const validation = Yup.object().shape({
    name: Yup.string().required("Required"),
    addL1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
  });

  const onSubmit = (bran: FlatBranch) => {
        const newBran: Branch = {name: bran.name, address: {addL1: bran.addL1, addL2: bran.addL2, city: bran.city, state: bran.state, zip: bran.zip}, uid: curr.uid}
        const prom = branchService.putBranch(newBran)
        closer(false)
        props.branchUpdate(newBran)
        return prom
        
    }

  return (
    <ModalBody>
            <FormComponent formData={{
          fields,
          validation,
                onSubmit
        }}
      />
    </ModalBody>
    )
}