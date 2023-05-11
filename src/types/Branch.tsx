export default interface Branch {
    uid?: number,
    name: string,
    address: {addL1: string, addL2: string, city: string, state: string, zip: number},
    deleted?: boolean
}

export interface FlatBranch {
    uid?: number,
    name: string,
    addL1: string, 
    addL2: string, 
    city: string, 
    state: string, 
    zip: number,
    deleted?: boolean
}
