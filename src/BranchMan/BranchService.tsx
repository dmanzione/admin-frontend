import {useEffect} from 'react'
import axios from 'axios' 

import Branch from './Branch'

const BranchService = {
    baseUrl: "http://localhost:8080",

    useGetBranches: function(load: Function, brans: Function) {
        useEffect(() => {
            load(true)
            axios.get(this.baseUrl + '/branches').then(response => {
                brans(response.data)
                load(false)
            })
        }, [])
    },

    putBranch: function(bran: Branch) {
        axios.put(this.baseUrl + '/branches/' + bran.key, bran).then(response => {
            console.log(response)
        })
    },

    delBranch: function(bran: Branch) {
        axios.delete(this.baseUrl + '/branches/' + bran.key).then(response => {
            console.log(response)
        })
    }
}

export default BranchService