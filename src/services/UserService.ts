import Address from "../types/Address";
import Customer from "../types/Customer";
import Employee from "../types/Employee";
import User from "../types/User";
import ApiService, { RequestType } from "./ApiService";

export default class UserService extends ApiService {
  private static instance: ApiService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): UserService {
    if (this.instance) return this.instance as UserService;

    this.instance = new UserService();
    return this.instance as UserService;
  }

  static getUserUrl(user: User) {
    return `/users/${user.role.name.toLowerCase()}s/${user.id}`;
  }

  private mapAddress(addr: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: number;
  }): Address {
    return new Address(
      addr.street1,
      addr.street2,
      addr.city,
      addr.state,
      addr.zipCode
    );
  }

  private mapCustomer(user: User): Customer {
    return new Customer(
      user.id!,
      user.firstName!,
      user.lastName!,
      user.email!,
      user.phone!,
      this.mapAddress(user.address),
      user.status!,
      user.role!
    );
  }

  private mapCustomers(users: User[]): Customer[] {
    return users.map(this.mapCustomer.bind(this));
  }

  private mapEmployee(user: User): Employee {
    return new Customer(
      user.id!,
      user.firstName!,
      user.lastName!,
      user.email!,
      user.phone!,
      this.mapAddress(user.address),
      user.status!,
      user.role!
    );
  }

  private mapEmployees(users: User[]): Employee[] {
    return users.map(this.mapCustomer.bind(this));
  }

  async getCustomers(): Promise<Customer[]> {
    return this.mapCustomers((await this.request("customers")) as User[]);
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.mapCustomer((await this.request(`customers/${id}`)) as User);
  }

  async getEmployees(): Promise<Employee[]> {
    return this.mapEmployees((await this.request("employees")) as User[]);
  }

  async getEmployee(id: string): Promise<Employee> {
    return this.mapEmployee((await this.request(`employees/${id}`)) as User);
  }

  async createCustomer() {
    await this.request("customers", {}, RequestType.POST);
  }

  async deleteUser(id: string, role: string): Promise<any> {
    return this.request(`${role.toLowerCase()}s/${id}`, {}, RequestType.DELETE);
  }
}
