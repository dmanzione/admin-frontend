import { ListGroup } from "react-bootstrap";
import { AccountType, getAccountTypeInfo, getType } from "../../types/AccountType";
import { useState } from "react";
import { getName } from "../../types/AccountType";


export default function AccountTypes(){

    const loanTypes:AccountType[] =[ AccountType.CHECKING, AccountType.SAVINGS, AccountType.LOAN, AccountType.CREDIT, AccountType.REWARDS_PROGRAM];
    const [types,setTypes] = useState<AccountType[]>(loanTypes);
    return(
        <ListGroup>
            {loanTypes.map(type => (
                <ListGroup.Item key={type}>
                    {getName(type)}
                    <br/><br/>
                    <small>{getAccountTypeInfo(type)}</small>
                    </ListGroup.Item>
                
                )
            )}
        </ListGroup>
    )



}