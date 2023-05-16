import { Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'

import Branch from '../../types/Branch';
import BranchListElem from './BranchListElem';

export default function BranchList(props: {branches: Branch[], sorter: Function}) {
    const branchList = props.branches
    const sortFunc = props.sorter

    const [currSort, setCurrS] = useState<string>("")
    const [asc, setAsc] = useState<boolean>(true)

  const handleSort = (type: string) => {
        if(currSort == type) {
            setAsc(!asc)
    } else {
            setAsc(true)
    }
        setCurrS(type)
    }

  useEffect(() => {
        if(currSort != "") {
            sortFunc(currSort, asc)
    }
    }, [currSort, asc])

    return (<Table bordered hover className="w-100" size="sm">
      <thead>
        <tr>
                        <th onClick={() => {handleSort("name");}}>Name {currSort == "name" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort("add1");}}>Street {currSort == "add1" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort("add2");}}>Street2 {currSort == "add2" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort("city");}}>City {currSort == "city" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort("state");}}>State {currSort == "state" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort("zip");}}>Zip {currSort == "zip" && <b>({asc? "Ascending" : "Descending"})</b>}</th>
                        <th onClick={() => {handleSort(" ");}}>clear filter</th>
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