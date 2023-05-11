import { ModalBody } from 'react-bootstrap';
import * as Yup from 'yup'

import FormComponent from "../FormComponent";
import { Field } from "../FormComponent";
import Branch from "../../types/Branch";
import { FlatBranch } from '../../types/Branch';
import BranchService from "../../services/BranchService";

export default function BranchAdd(props: {closer: Function}) {
    const closer = props.closer

    const fields: Field[] = 
        [{
            name: "name",
            initValue: "",
            displayName: "Branch Name",
            type: "text"
        },{
            name: "addL1",
            initValue: "",
            displayName: "Address 1",
            type: "text"
        },{
            name: "addL2",
            initValue: "",
            displayName: "Address 2",
            type: "text"
        },{
            name: "city",
            initValue: "",
            displayName: "City",
            type: "text"
        },{
            name: "state",
            initValue: "",
            displayName: "State",
            type: "text"
        },{
            name: "zip",
            initValue: "",
            displayName: "Zip Code",
            type: "number"
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
        const newBran: Branch = {name: bran.name, address: {addL1: bran.addL1, addL2: bran.addL2, city: bran.city, state: bran.state, zip: bran.zip}}
        BranchService.postBranch(newBran)
        closer(false)
    }

    return (
        <ModalBody>
            <FormComponent formData={{
                title: "Edit Branch",
                fields,
                validation,
                onSubmit
            }}
            />
        </ModalBody>
    )
}