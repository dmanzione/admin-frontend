export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
    CANCELLED = 'CANCELLED',
    DECLINED = 'DECLINED'
}

export function getStatus(status: string): TransactionStatus {
     switch (status) {
         case 'PENDING':
             return TransactionStatus.PENDING;
         case 'COMPLETE':
             return TransactionStatus.COMPLETE;
         case 'CANCELLED':
             return TransactionStatus.CANCELLED;
         case 'DECLINED':
             return TransactionStatus.DECLINED;
         default:
             return TransactionStatus.PENDING;
     }
}

export function getStatuses() {
    return [TransactionStatus.PENDING, TransactionStatus.COMPLETE, TransactionStatus.CANCELLED, TransactionStatus.DECLINED];
}
 
export function getName(status: TransactionStatus): string {
    switch (status) {
        case TransactionStatus.PENDING:
            return 'Pending';
        case TransactionStatus.COMPLETE:
            return 'Complete';
        case TransactionStatus.CANCELLED:
            return 'Cancelled';
        case TransactionStatus.DECLINED:
            return 'Declined';
        default:
            return 'Pending';
    }
}