import AccountStatus from "./AccountStatus";
import Address from "./Address";
import Role from "./Role";
import User from "./User";

class Customer extends User {
  constructor(
    pk:number,
    id: string,
    dateCreated: Date,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: Address,
    status: AccountStatus,
    role: number
  ) {
    super(pk,id,firstName,lastName,email,phone,dateCreated,role,address,status)
  }
}

export default Customer;
