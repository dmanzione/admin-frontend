import { UsState } from "./UsState";

class Address {
  street1: string;
  street2: string | null;
  city: string;
  state: UsState;
  zipCode: string;

  constructor(
    street1: string,
    street2: string | null,
    city: string,
    state: UsState,
    zip: string
  ) {
    this.street1 = street1;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.zipCode = zip;
  }

  toString(): string {
    return `${this.street1}${this.street2 ? " " + this.street2 + "," : ","} ${
      this.city
    }, ${this.state} ${this.zipCode}`;
  }
}

export default Address;
