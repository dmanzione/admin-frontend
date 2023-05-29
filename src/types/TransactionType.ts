export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER',
   

}

   export function getName(type:TransactionType){
    switch(type){
        case TransactionType.DEPOSIT:
            return 'Deposit';
        case TransactionType.WITHDRAWAL:
            return 'Withdrawal';
        case TransactionType.TRANSFER:
            return 'Transfer';
        
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
       
    }
}



export default TransactionType;
