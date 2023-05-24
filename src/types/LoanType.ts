export enum LoanType {

  PERSONAL_LOAN = "Personal Loan",
  AUTO_LOAN = "Auto Loan",
  STUDENT_LOAN = "Student Loan",
  MORTGAGE_LOAN = "Mortgage Loan",
  HOME_EQUITY_LOAN = "Home Equity Loan",
  CREDIT_BUILDER_LOAN = "Credit Builder Loan",
  DEBT_CONSOLIDATION_LOAN = "Debt Consolidation Loan",
  PAYDAY_LOAN = "Pay Day Loan",
  OTHER_LOAN = "Other Loan",

}

export const getLoanType = (typeString: string): LoanType => {
  switch (typeString) {
    case "PERSONAL_LOAN":
      return LoanType.PERSONAL_LOAN;
    case "AUTO_LOAN":
      return LoanType.AUTO_LOAN;
    case "STUDENT_LOAN":
      return LoanType.STUDENT_LOAN;
     

    case "MORTGAGE_LOAN":
      return LoanType.MORTGAGE_LOAN;
     
    case "HOME_EQUITY_LOAN":
      return LoanType.HOME_EQUITY_LOAN;
     
    case "CREDIT_BUILDER_LOAN":
      return LoanType.CREDIT_BUILDER_LOAN;
     
    case "DEBT_CONSOLIDATION_LOAN":
      return LoanType.DEBT_CONSOLIDATION_LOAN;
     
    case "PAYDAY_LOAN":
      return LoanType.PAYDAY_LOAN;
     
    case "OTHER_LOAN":
    default:
      return LoanType.OTHER_LOAN;
     


  }
}

export function getName(type: LoanType): string {
  switch (type) {
    case LoanType.PERSONAL_LOAN:
      return "Personal Loan";
     
    case LoanType.AUTO_LOAN:
      return "Auto Loan";
     
    case LoanType.STUDENT_LOAN:
      return "Student Loan";
     
      case LoanType.MORTGAGE_LOAN:
        return "Mortgage Loan";
       
    case LoanType.HOME_EQUITY_LOAN:
      return "Home Equity Loan";
     
    case LoanType.CREDIT_BUILDER_LOAN:
      return "Credit Builder Loan";
     
    case LoanType.DEBT_CONSOLIDATION_LOAN:
      return "Debt Consolidation Loan";
     
    case LoanType.PAYDAY_LOAN:
      return "Pay Day Loan";
     
    case LoanType.OTHER_LOAN:
      return "Other Loan";
     
      default:
      return 'N/A'
  }
}
  export const getAllLoanTypes = () => {
    return [LoanType.PERSONAL_LOAN, LoanType.AUTO_LOAN,
    LoanType.STUDENT_LOAN, LoanType.MORTGAGE_LOAN,
    LoanType.HOME_EQUITY_LOAN, LoanType.CREDIT_BUILDER_LOAN,
    LoanType.DEBT_CONSOLIDATION_LOAN, LoanType.PAYDAY_LOAN,
    LoanType.OTHER_LOAN]
  }
