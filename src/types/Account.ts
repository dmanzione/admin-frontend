import  User  from "./User";
import AccountStatus from "./AccountStatus";
import { AccountType } from "./AccountType";
import FinancialProduct from "./FinancialProduct";


export default class Account {
  pk?: number | null;
  number?: string|null|undefined;
  customer: User|null;
  dateCreated: Date|null  = null;

  status: AccountStatus=AccountStatus.OPEN;
  type: AccountType = AccountType.CHECKING;
  bankAgent:User|null;
  deleted:boolean = false;
  financialProducts:FinancialProduct[] = new Array<FinancialProduct>();
  
  constructor(pk: number, number: string, owner: User, bankAgent:User,  balance: number,  status: AccountStatus, type: AccountType) {
    this.pk = pk;
    this.number = number;
    this.customer = owner;
 
 
    this.bankAgent=bankAgent;
   

  }

  

 
  toString = ()=>{
    return `    acct # = ${this.pk}, owner = ${this.customer?.firstName||'' + " " + this.customer?.lastName||''}, dateCreated = ${this.dateCreated||''}, status = ${this.status || ' '}, type = ${this.type}`;
 
 }
 }

