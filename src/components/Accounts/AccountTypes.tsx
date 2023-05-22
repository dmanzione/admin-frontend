import { ListGroup } from "react-bootstrap";
import { AccountType } from "../../types/AccountType";
import { useState } from "react";


export default function AccountTypes(){

    const loanTypes:AccountType[] =[ AccountType.CHECKING, AccountType.SAVINGS, AccountType.LOAN, AccountType.CREDIT_CARD, AccountType.REWARDS_PROGRAM,AccountType.UNKNOWN];
    const [types,setTypes] = useState<AccountType[]>(loanTypes);
    return(
        <ListGroup>
            {loanTypes.map(type => (
                <ListGroup.Item key={type}>{type}</ListGroup.Item>)
            )}
        </ListGroup>
    )



}