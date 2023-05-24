export  enum CreditCardType {
   

    REWARDS_CREDIT_CARD = "Rewards Credit Card",
    CASH_BACK_CREDIT_CARD = "Cash Back Credit Card",
    TRAVEL_CREDIT_CARD = "Travel Credit Card",
    BUSINESS_CREDIT_CARD = "Business Credit Card",
    CO_BRANDED_CREDIT_CARD =    "Co-Branded Credit Card",
    STORE_CREDIT_CARD = "Store Credit Card",
    STARTER_STUDENT_CREDIT_CARD = "Starter Student Credit Card",
    STARTER_SECURED_CREDIT_CARD = "Starter Student Secure Credit Card",
    STARTER_UNSECURED_CREDIT_CARD = "Starter Student Unsecure Credit Card",
}

export function getCreditCardTypes(){

        return [
            CreditCardType.REWARDS_CREDIT_CARD,
            CreditCardType.CASH_BACK_CREDIT_CARD,
            CreditCardType.TRAVEL_CREDIT_CARD,
            CreditCardType.BUSINESS_CREDIT_CARD,
            CreditCardType.CO_BRANDED_CREDIT_CARD,
            CreditCardType.STORE_CREDIT_CARD,
            CreditCardType.STARTER_STUDENT_CREDIT_CARD,
            CreditCardType.STARTER_SECURED_CREDIT_CARD,
            CreditCardType.STARTER_UNSECURED_CREDIT_CARD
        ]
}
export function getCreditCardType(type: string): CreditCardType  {

    switch(type.toLowerCase().replace("_", " ")){
        case "rewards credit card":
            return CreditCardType.REWARDS_CREDIT_CARD;
        case "cash back credit card":
            return CreditCardType.CASH_BACK_CREDIT_CARD;
        case "travel credit card":
            return CreditCardType.TRAVEL_CREDIT_CARD;
        case "business credit card":
            return CreditCardType.BUSINESS_CREDIT_CARD;
        case "co-branded credit card":
            return CreditCardType.CO_BRANDED_CREDIT_CARD;
        case "store credit card":
            return CreditCardType.STORE_CREDIT_CARD;
        case "starter student credit card":
            return CreditCardType.STARTER_STUDENT_CREDIT_CARD;
        case "starter student secure credit card":
            return CreditCardType.STARTER_SECURED_CREDIT_CARD;
        case "starter student unsecured credit card":
            return CreditCardType.STARTER_UNSECURED_CREDIT_CARD;
        default:
            return CreditCardType.REWARDS_CREDIT_CARD;
            break;
    }
    }

    export function getCreditCardTypeName(type: CreditCardType): string {
        
        switch(type){
            case CreditCardType.REWARDS_CREDIT_CARD:
                return "Rewards Credit Card";
            case CreditCardType.CASH_BACK_CREDIT_CARD:
                return "Cash Back Credit Card";
            case CreditCardType.TRAVEL_CREDIT_CARD:
                return "Travel Credit Card";
            case CreditCardType.BUSINESS_CREDIT_CARD:
                return "Business Credit Card";
            case CreditCardType.CO_BRANDED_CREDIT_CARD:
                return "Co-Branded Credit Card";
            case CreditCardType.STORE_CREDIT_CARD:
                return "Store Credit Card";
            case CreditCardType.STARTER_STUDENT_CREDIT_CARD:
                return "Starter Student Credit Card";
            case CreditCardType.STARTER_SECURED_CREDIT_CARD:
                return "Starter Student Secure Credit Card";
            case CreditCardType.STARTER_UNSECURED_CREDIT_CARD:
                return "Starter Student Unsecure Credit Card";
            default:
                return "Rewards Credit Card";
                break;
        }
    }
