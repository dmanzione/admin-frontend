import {useState, useEffect} from 'react'
import axios from 'axios' 

import Branch from '../BranchMan/Branch'

export default function BranchList() {
    const [spring, setSpring] = useState<Branch[]>([])
    const [loading, setLoad] = useState<boolean>(false)
    const [loadingAuth, setLoadingAuth] = useState(false)

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
            <h2>All available branches</h2>
            <table>
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
                    {spring.map((val,key) =>
                        
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.address.addL1}</td>
                            <td>{val.address.addL2}</td>
                            <td>{val.address.city}</td>
                            <td>{val.address.state}</td>
                            <td>{val.address.zip}</td>
                            <td style={{"border": 0}}><button className="btn btn-danger">del</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

    
}