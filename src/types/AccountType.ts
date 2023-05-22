export enum AccountType {



    CHECKING,
    SAVINGS,
    CREDIT_CARD,
    LOAN,
    REWARDS_PROGRAM,
    UNKNOWN

}


export function getType(type: string): AccountType  {
    return AccountType[type as keyof typeof AccountType];
  }

  export default AccountType; 
   