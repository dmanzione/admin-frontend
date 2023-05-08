import Branch from "../types/Branch"

export default function BranchListElem(props: {branch: Branch}) {
    const curr = props.branch

    return (
        <tr>
            <td>{curr.name}</td>
            <td>{curr.address.addL1}</td>
            <td>{curr.address.addL2}</td>
            <td>{curr.address.city}</td>
            <td>{curr.address.state}</td>
            <td>{curr.address.zip}</td>
            <td><p className="color-primary">View</p></td>
        </tr>
    )
}