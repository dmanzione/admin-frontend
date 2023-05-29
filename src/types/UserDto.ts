


import { UsState } from './UsState';
import AccountStatus from './AccountStatus';

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
