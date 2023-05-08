import { useState } from 'react'

import Branch from '../../types/Branch'
import BranchList from '../../BranchMan/BranchList'
import BranchService from '../../services/BranchService'
import BranchEdit from '../../BranchMan/BranchEdit'
import BranchDel from '../../BranchMan/BranchDel'

export default function BranchListPage() {
    const [loading, setLoad] = useState<boolean>(false);
    const [spring, setSpring] = useState<Branch[]>([])
    const [loadingAuth, setLoadingAuth] = useState(false)

    BranchService.useGetBranches(setLoad, setSpring)

    if (loading) {
        return <p>Please wait warmly</p>
    }

    return (
        <div>
            <h2 className="m-3">All available branches</h2>
            <BranchList branches={spring} />
        </div>
    )
}