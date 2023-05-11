import AccountStatus from "./AccountStatus";
import Address from "./Address";
import Role from "./Role";
import User from "./User";

class Customer extends User {
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
    super(id, firstName, lastName, email, phone, address, status, role);
  }
}

export default Customer;
