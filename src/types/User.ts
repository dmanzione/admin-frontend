import AccountStatus from "./AccountStatus";
import Address from "./Address";
import Role from "./Role";
import { UsState } from "./UsState";

interface CopyPayload {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: UsState | null;
  zipCode?: string | null;
}

class User {
  id: string;
  dateCreated: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  status: AccountStatus;
  role: Role;

  constructor(
    id: string,
    dateCreated: Date,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: Address,
    status: AccountStatus,
    role: Role
  ) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.status = status;
    this.role = role;
  }

  public fullName() {
    return `${this.lastName}, ${this.firstName}`;
  }

  public copy({
    firstName = null,
    lastName = null,
    email = null,
    phone = null,
    street1 = null,
    street2 = null,
    city = null,
    state = null,
    zipCode = null,
  }: CopyPayload) {
    const ad = this.address;
    return new User(
      this.id,
      this.dateCreated,
      firstName || this.firstName,
      lastName || this.lastName,
      email || this.email,
      phone || this.phone,
      new Address(
        street1 || ad.street1,
        street2 || ad.street2,
        city || ad.city,
        state || ad.state,
        zipCode || ad.zipCode
      ),
      this.status,
      this.role
    );
  }
}

export default User;
