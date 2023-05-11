import AccountStatus from "./AccountStatus";
import Address from "./Address";
import Role from "./Role";

class User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: Address
  status: AccountStatus
  role: Role

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: Address,
    status: AccountStatus,
    role: Role
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.status = status;
    this.role = role;
  }

  public fullName() {
    return `${this.lastName}, ${this.firstName}`
  }

}

export default User;
