export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER',
    CHECK = 'CHECK',
    CREDIT = 'CREDIT',
    LOAN = 'LOAN',

}

   export function getName(type:TransactionType){
    switch(type){
        case TransactionType.DEPOSIT:
            return 'Deposit';
        case TransactionType.WITHDRAWAL:
            return 'Withdrawal';
        case TransactionType.TRANSFER:
            return 'Transfer';
        case TransactionType.CHECK:
            return 'Check';
        case TransactionType.CREDIT:
            return 'Credit';
        case TransactionType.LOAN:
            return 'Loan';
    }
}

export function getType(name:string){

    switch(name){
        case 'Deposit':
            return TransactionType.DEPOSIT;
        case 'Withdrawal':
            return TransactionType.WITHDRAWAL;
        case 'Transfer':
            return TransactionType.TRANSFER;
        case 'Check':
            return TransactionType.CHECK;
        case 'Credit':
            return TransactionType.CREDIT;
        case 'Loan':
            return TransactionType.LOAN;
    }
}



export default TransactionType;
