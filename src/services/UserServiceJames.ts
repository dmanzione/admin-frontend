import Address from "../types/Address";
import Customer from "../types/Customer";
import Employee from "../types/Employee";
import { UsState } from "../types/UsState";
import User from "../types/User";
import ApiService, { RequestType } from "./ApiService";

interface AddressDto {
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface UpdateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: AddressDto;
}

export interface NewDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

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

  private mapAddress(address: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
  }): Address {
    return new Address(
      address.street1,
      address.street2,
      address.city,
      address.state as UsState,
      address.zipCode
    );
  }

  private mapCustomer(user: Customer): Customer {
    return new Customer(
      user.id!,
      new Date(user.dateCreated!),
      user.firstName!,
      user.lastName!,
      user.email!,
      user.phone!,
      this.mapAddress(user.address),
      user.status!,
      user.role!
    );
  }

  private mapCustomers(users: Customer[]): Customer[] {
    return users.map(this.mapCustomer.bind(this));
  }

  private mapEmployee(user: Employee): Employee {
    return new Customer(
      user.id!,
      new Date(user.dateCreated!),
      user.firstName!,
      user.lastName!,
      user.email!,
      user.phone!,
      this.mapAddress(user.address),
      user.status!,
      user.role!
    );
  }

  private mapEmployees(users: Employee[]): Employee[] {
    return users.map(this.mapCustomer.bind(this));
  }

  async getCustomers(): Promise<Customer[]> {
    return this.mapCustomers((await this.request("customers")) as Customer[]);
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.mapCustomer((await this.request(`customers/${id}`)) as Customer);
  }

  async getEmployees(): Promise<Employee[]> {
    return this.mapEmployees((await this.request("employees")) as Employee[]);
  }

  async getEmployee(id: string): Promise<Employee> {
    return this.mapEmployee((await this.request(`employees/${id}`)) as Employee);
  }

  async createCustomer(newUser: NewDto) {
    const data = {
      password: "defaultPassword",
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      address: {
        street1: newUser.street1,
        street2: newUser.street2,
        city: newUser.city,
        state: newUser.state,
        zipCode: newUser.zipCode,
      },
    };

    return this.mapCustomer(
      (await this.request("customers", data, RequestType.POST)) as User
    );
  }
  async createEmployee(newUser: NewDto) {
    const data = {
      password: "defaultPassword",
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      address: {
        street1: newUser.street1,
        street2: newUser.street2,
        city: newUser.city,
        state: newUser.state,
        zipCode: newUser.zipCode,
      },
    };

    return this.mapEmployee(
      (await this.request("employees", data, RequestType.POST)) as User
    );
  }

  async updateCustomer(user: Customer): Promise<Customer> {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: {
        street1: user.address.street1,
        street2: user.address.street2,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
      },
    };

    return this.mapCustomer(
      (await this.request(`customers/${user.id}`, data, RequestType.PUT)) as User
    );
  }

  async updateEmployee(user: Employee): Promise<Employee> {
    const data: UpdateDto = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: {
        street1: user.address.street1,
        street2: user.address.street2,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
      },
    };

    return this.mapCustomer(
      (await this.request(`employees/${user.id}`, data, RequestType.PUT)) as User
    );
  }

  async deleteUser(user: User): Promise<string> {
    return this.request(
      `${user.role.name.toLowerCase()}s/${user.id}`,
      {},
      RequestType.DELETE
    );
  }
}
