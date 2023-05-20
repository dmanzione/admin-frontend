import AccountStatus from "./AccountStatus";
import { AccountType } from "./AccountType";

export default class Account {
  pk!: number;
  id!: string;
  owner!: number;
  dateCreated!: Date;
  balance!: number;
  rate!: number;
  status!: AccountStatus;
  type!: AccountType;

  constructor(pk: number, id: string, owner: number, dateCreated: Date, balance: number, rate: number, status: AccountStatus, type: AccountType) {
    this.pk = pk;
    this.id = id;
    this.owner = owner;
    this.dateCreated = dateCreated;
    this.balance = balance;
  }

  

 
  toString = ()=>{
    return `    acct # = ${this.pk}, owner = ${this.owner}, dateCreated = ${this.dateCreated}, balance = ${this.balance}, rate = ${this.rate}, status = ${this.status}, type = ${this.type}`;
 
 }
 }

