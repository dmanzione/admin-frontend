import { useNavigate } from "react-router-dom"

import Branch from "../../types/Branch"


export default function BranchListElem(props: {branch: Branch}) {
    const curr = props.branch

    const nav = useNavigate()

    const goToBranch = () => {
        nav("/branches/" + curr.uid)
    }

    return (
        <tr onClick={goToBranch}>
            <td>{curr.name}</td>
            <td>{curr.address.addL1}</td>
            <td>{curr.address.addL2}</td>
            <td>{curr.address.city}</td>
            <td>{curr.address.state}</td>
            <td>{curr.address.zip}</td>
            <td><p style= {{color: "blue"}}><u>View</u></p></td>
        </tr>
    )
}