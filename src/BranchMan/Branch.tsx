export default interface Branch {
    key?: number,
    name: string,
    address: {addL1: string, addL2: string, city: string, state: string, zip: number},
    deleted?: boolean
}
