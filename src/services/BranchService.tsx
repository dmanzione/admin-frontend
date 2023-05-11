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
        var sortUrl
        if(sort == " ") {
            sortUrl = this.baseUrl + '/branches'
        } else {
            sortUrl = this.baseUrl + '/branches?sort=' + sort + (asc ? '' : "&order=2")
        }
        return axios.get(sortUrl).then(response => {
            return response.data
        }).catch(() => {
            return []
        })
    },

    async postBranch(bran: Branch): Promise<Branch> {
        return axios.post(this.baseUrl + '/branches', bran).then(response => {
            console.log(response)
            return response.data
        })
    },

    async putBranch(bran: Branch) {
        return axios.put(this.baseUrl + '/branches/' + bran.uid, bran).then(response => {
            console.log(response)
            return response.data
        })
    },

    async delBranch(bran: Branch) {
        return axios.delete(this.baseUrl + '/branches/' + bran.uid).then(response => {
            console.log(response)
            return response.data
        })
    }
}

export default BranchService