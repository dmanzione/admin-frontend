

import axios from 'axios';
import User from '../types/User';
import Customer from '../types/Customer';
import Employee from '../types/Employee';
import ApiService, { RequestType } from './ApiService';
import Address from '../types/Address';

import { UsState } from '../types/UsState';
import AccountStatus, { getStatus } from '../types/AccountStatus';
import { useState } from 'react';

export interface UserDto {
  pk:number,
  id:string,
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateCreated:Date;
  role:number;
  address :{
    street1: string;
     street2: string | null;
      city: string;
       state: UsState;
   zipCode: string;
  };
  status:AccountStatus;

}

// Define the base URL for the API
const baseURL = 'http://localhost:8080/accounts-api/';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,headers:{'Access-Control-Allow-Origin': '*'}}
);

// Define the type for the HATEOAS response



// Define the type for the User
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

// Define the function to get all loans
export const getAllUsers = async (): Promise<UserDto[]> => {
  try {
    // Make a GET request to /loans and get the data
    const { data } = await api.get('users');
    // Return the loans array from the _embedded property
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }

};

export interface CustomerDto {
  id:number;
  user:UserDto;
}



export const getCustomers= async (): Promise<UserDto[]> => {
  
  let usrs: UserDto[]=[];
  // let customers: CustomerDto[]=[];
  getAllUsers().then(data=>{
    usrs= data.map(usr => {
     let q = {pk:usr.pk,
    id:usr.id,dateCreated:usr.dateCreated,firstName:usr.firstName,lastName:usr.lastName,
        email:usr.email,phone:usr.phone,address:usr.address,status:getStatus(usr.status),role:3};

            
    return q;
     })
     usrs = usrs.filter(x=>x.role===3);
return usrs;
    })
  
  .catch(err=>console.error(err));
  
  
  
  return usrs;
};


interface EmployeeDto {
  id:string;
  user:number;
}



export const getEmployees= async (): Promise<Employee[]> => {
  let employees:Employee[] = [];
   try{

    const { data} = await api.get('/employees');

   


  
    employees = data.map((employee:Employee) => {
      const emp:Employee = new Employee(employee.id,employee.dateCreated,employee.firstName,employee.lastName,
        employee.email,employee.phone,employee.address,employee.status,{name:"EMPLOYEE",description:"Description"});

        return emp;
      
  })

    return employees;


  
  }catch(error) {
    console.error(error);
    return employees;
   }
   
  
  return employees;
};
// Define the function to get a loan by id
export const getUserByPk = async (pk: number): Promise<User> => {
  try {
    // Make a GET request to /loans/{id} and get the data
    const { data } = await api.get<User>(`/${pk}`);
    // Return the loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to create a new loan
export const createUser = async (loan: User): Promise<User> => {
  try {
    // Make a POST request to /loans with the loan object as the body and get the data
    const { data } = await api.post<User>('/', loan);
    // Return the created loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to update an existing loan
export const updateUser = async (id: number, user: User): Promise<User> => {
  try {
    // Make a PUT request to /loans/{id} with the loan object as the body and get the data
    const { data } = await api.put<User>(`/${id}`, user);
    // Return the updated loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to delete an existing loan
export const deleteUser = async (id: number): Promise<void> => {
  try {
    // Make a DELETE request to /loans/{id}
    await api.delete(`/${id}`);
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};



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