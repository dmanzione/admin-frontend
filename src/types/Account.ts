import { UserDto } from "../types/UserDto";
import AccountStatus from "./AccountStatus";
import { AccountType } from "./AccountType";
import Customer from "./Customer";
import Employee from "./Employee";
import FinancialProduct from "./FinancialProduct";

export default class Account {
  pk?: number | null;
  number?: string|null|undefined;
  customer: UserDto|null;
  dateCreated: Date|null  = null;
  balance: number;
  status: AccountStatus=AccountStatus.OPEN;
  type: AccountType = AccountType.CHECKING;
  bankAgent:UserDto|null;
  
  constructor(pk: number, number: string, owner: UserDto, bankAgent:UserDto,  balance: number,  status: AccountStatus, type: AccountType) {
    this.pk = pk;
    this.number = number;
    this.customer = owner;
 
    this.balance = balance;
    this.bankAgent=bankAgent;
   

  }

  

 
  toString = ()=>{
    return `    acct # = ${this.pk}, owner = ${this.customer?.firstName||'' + " " + this.customer?.lastName||''}, dateCreated = ${this.dateCreated||''}, balance = ${this.balance || ' '}, status = ${this.status || ' '}, type = ${this.type}`;
 
 }
 }

