import { ListGroup } from "react-bootstrap";
import { LoanType } from "../../types/LoanType";
import { useState } from "react";


export default function LoanTypes(){

    const loanTypes:LoanType[] =[ LoanType.AUTO_LOAN,LoanType.CREDIT_BUILDER_LOAN,LoanType.DEBT_CONSOLIDATION_LOAN,LoanType.HOME_EQUITY_LOAN,LoanType.MORTGAGE_LOAN,LoanType.PAYDAY_LOAN,LoanType.PERSONAL_LOAN,LoanType.STUDENT_LOAN];
    const [types,setTypes] = useState<LoanType[]>(loanTypes);
    return(
        <ListGroup>
            {loanTypes.map(type => (
                <ListGroup.Item key={type}>{type}</ListGroup.Item>)
            )}
        </ListGroup>
    )



}