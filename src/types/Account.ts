import { UserDto } from "../services/UserService";
import AccountStatus from "./AccountStatus";
import { AccountType } from "./AccountType";
import Customer from "./Customer";
import Employee from "./Employee";

export default class Account {
  pk: number | null;
  number: string;
  customer: UserDto|null;
  startDate: Date;
  balance: number;
  rate: number = 5.0;
  status: AccountStatus=AccountStatus.OPEN;
  type: AccountType = AccountType.CHECKING;
  dueDate: Date | null=new Date();
  bankAgent:UserDto|null;
  constructor(pk: number, number: string, owner: UserDto, bankAgent:UserDto, dateCreated: Date, balance: number, rate: number, status: AccountStatus, type: AccountType) {
    this.pk = pk;
    this.number = number;
    this.customer = owner;
    this.startDate = dateCreated;
    this.balance = balance;
    this.bankAgent=bankAgent;
  }

  

 
  toString = ()=>{
    return `    acct # = ${this.pk}, owner = ${this.customer?.firstName||'' + " " + this.customer?.lastName||''}, dateCreated = ${this.startDate||''}, balance = ${this.balance || ' '}, rate = ${this.rate || ' '}, status = ${this.status || ' '}, type = ${this.type}`;
 
 }
 }

