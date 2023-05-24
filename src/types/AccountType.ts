export enum AccountType {



    CHECKING="CHECKING",
    SAVINGS="SAVINGS",
    CREDIT = "CREDIT",
    LOAN="LOAN",
    REWARDS_PROGRAM="REWARDS_PROGRAM"

}


export function getType(type: string): AccountType  {
    switch (type.toLowerCase().replace("_", " ")) {
        case 'checking':
            return AccountType.CHECKING;
        case'savings':
            return AccountType.SAVINGS;
        case 'credit card':
            return AccountType.CREDIT;
        case 'loan':
            return AccountType.LOAN;
        case'rewards program':
            return AccountType.REWARDS_PROGRAM;
        default:
            return AccountType.CHECKING;
    }
  }

export function getAccountTypes(){
    return [
        AccountType.CHECKING,
        AccountType.SAVINGS,
        AccountType.CREDIT,
        AccountType.LOAN,
        AccountType.REWARDS_PROGRAM
    ]
}

export function getName(type: AccountType): string {
    switch (type) {
        case AccountType.CHECKING:
            return "Checking";
        case AccountType.SAVINGS:
            return "Savings";
        
        case AccountType.LOAN:
            return "Loan";
        case AccountType.CREDIT:
            return "Credit";
        case AccountType.REWARDS_PROGRAM:
            return "Rewards Program";
        
        default:
            return "Checking";
    }
}

export function getAccountTypeInfo(accountType: AccountType): string {
    switch (accountType) {
      case AccountType.CHECKING:
        return 'A checking account is a type of deposit account that allows you to easily access your money for daily transactions.';
      case AccountType.SAVINGS:
        return 'A savings account is a type of deposit account that earns interest and is used to save money for the future.';
      case AccountType.CREDIT:
        return 'A credit account is a type of loan account that allows you to borrow money and pay it back over time with interest.';
      case AccountType.LOAN:
        return 'A loan account is a type of credit account that allows you to borrow a fixed amount of money and pay it back over time with interest.';
      default:
        return 'N/A'
    }
}
  
  
  

  export default AccountType; 
   