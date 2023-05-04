import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Table } from 'react-bootstrap'

import Branch from '../BranchMan/Branch'
import BranchService from '../BranchMan/BranchService'
import BranchEdit from '../BranchMan/BranchEdit'
import BranchDel from '../BranchMan/BranchDel'

export default function BranchList() {
    const [loading, setLoad] = useState<boolean>(false)
    const [spring, setSpring] = useState<Branch[]>([])
    const [loadingAuth, setLoadingAuth] = useState(false)

    const [edit, setEdit] = useState<boolean>(false)
    const [del, setDel] = useState<boolean>(false)

    const [curr, setCurr] = useState<Branch>({name:"", address: {addL1:"", addL2:"", city:"", state:"", zip:0}, deleted:false})

    const baseUrl = "http://localhost:8080"

    useEffect(() => {
        setLoad(true)
        axios.get(baseUrl + '/branches').then(response => {
        setSpring(response.data)
        setLoad(false)
        })
    }, [])

    if (loading) {
        return <p>Please wait warmly</p>
    }

    return (
        <div>
            {edit && <BranchEdit closeFun={() => setEdit(false)} branch={curr}/>}
            {del && <BranchDel closeFun={() => setDel(false)} branch={curr}/>}
            <h2>All available branches</h2>
            <Table className="w-100">
                <thead>
                    <tr>
                        <th className="border border-dark">Name</th>
                        <th className="border border-dark">Street</th>
                        <th className="border border-dark">Street2</th>
                        <th className="border border-dark">City</th>
                        <th className="border border-dark">State</th>
                        <th className="border border-dark">Zip</th>
                    </tr>
                </thead>
                <tbody>
                    {spring.map((val,key) =>
                        //gotta be a better way of bordering this like this
                        <tr key={key}>
                            <td className="border border-dark">{val.name}</td>
                            <td className="border border-dark">{val.address.addL1}</td>
                            <td className="border border-dark">{val.address.addL2}</td>
                            <td className="border border-dark">{val.address.city}</td>
                            <td className="border border-dark">{val.address.state}</td>
                            <td className="border border-dark">{val.address.zip}</td>
                            <td className="border-0">
                                <Button onClick={() => {setEdit(true); setCurr(val)}} className='btn btn-primary'>edit</Button>
                                <Button onClick={() => {setDel(true); setCurr(val)}} className="btn btn-danger">del</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )

    
}