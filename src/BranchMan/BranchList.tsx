import { Button, Table } from 'react-bootstrap'

import Branch from '../types/Branch';
import BranchListElem from './BranchListElem';

export default function BranchList(props: {branches: Branch[]}) {
    const branchList = props.branches

    return (<Table bordered className="w-100" size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street</th>
                        <th>Street2</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                    </tr>
                </thead>
                <tbody>
                    {branchList.map((val,key) =>
                        <BranchListElem branch={val} key={key}/>
                    )}
                </tbody>
            </Table>
    )
}