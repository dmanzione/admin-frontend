


import { UsState } from './UsState';
import AccountStatus from './AccountStatus';

export default class User {
  pk:number;
  id:string;
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
  constructor(pk:number, id:string, firstName: string, lastName: string, email: string, phone: string, dateCreated:Date, role:number, address :{
    street1: string;
     street2: string | null;
      city: string;
       state: UsState;
   zipCode: string;
  }, status:AccountStatus) {
    this.pk = pk;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.dateCreated = dateCreated;
    this.role = role;
    this.address = address;
    this.status = status;
  
    
  }

}
