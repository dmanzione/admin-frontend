import axios from 'axios' 

import Branch from '../types/Branch'

const BranchService = {
    baseUrl: "http://localhost:8080",

    async getBranches(closer: Function): Promise<Branch[]> {
        return axios.get(this.baseUrl + '/branches').then(response => {
            closer(false)
            return response.data
        }).catch(() => {
            return []
        })
    },
    
    async getBranch(uid: string): Promise<Branch> {
        return axios.get(this.baseUrl + '/branches/' + uid).then(response => {
            return response.data
        }).catch(() => {
            return null
        })
    },

    async sortBranches(sort: string, asc: boolean): Promise<Branch[]> {
        const sortUrl = this.baseUrl + '/branches?sort=' + sort + (asc ? '' : "&order=2")
        return axios.get(sortUrl).then(response => {
            return response.data
        }).catch(() => {
            return []
        })
    },

    postBranch(bran: Branch) {
        axios.post(this.baseUrl + '/branches', bran).then(response => {
            console.log(response)
        })
    },

    putBranch(bran: Branch) {
        axios.put(this.baseUrl + '/branches/' + bran.uid, bran).then(response => {
            console.log(response)
        })
    },

    async delBranch(bran: Branch) {
        axios.delete(this.baseUrl + '/branches/' + bran.uid).then(response => {
            console.log(response)
        })
    }
}

export default BranchService