export  enum CreditCardType {
   

    REWARDS_CREDIT_CARD = "REWARDS_CREDIT_CARD",
    CASH_BACK_CREDIT_CARD = "CASH_BACK_CREDIT_CARD",
    TRAVEL_CREDIT_CARD = "TRAVEL_CREDIT_CARD",
    BUSINESS_CREDIT_CARD = "BUSINESS_CREDIT_CARD",
    STARTER_STUDENT_CREDIT_CARD = "STARTER_STUDENT_CREDIT_CARD",
    STARTER_SECURED_CREDIT_CARD = "STARTER_SECURED_CREDIT_CARD",
    STARTER_UNSECURED_CREDIT_CARD = "STARTER_UNSECURED_CREDIT_CARD",

    OTHER_CREDIT_CARD = "OTHER_CREDIT_CARD",


}

export function getCreditCardTypes(){

        return [
            CreditCardType.REWARDS_CREDIT_CARD,
            CreditCardType.CASH_BACK_CREDIT_CARD,
            CreditCardType.TRAVEL_CREDIT_CARD,
            CreditCardType.BUSINESS_CREDIT_CARD,
            CreditCardType.STARTER_STUDENT_CREDIT_CARD,
            CreditCardType.STARTER_SECURED_CREDIT_CARD,
            CreditCardType.STARTER_UNSECURED_CREDIT_CARD,
            CreditCardType.OTHER_CREDIT_CARD
        ]
}

interface CardsDashboardItem {
    imageUrl: string;
    linkUrl: string;
    description: string;
  }
export function getCreditCardDashboardItems(): Array<CardsDashboardItem> {

    return [
        {imageUrl: "assets/credit card pics/Rewards.png", linkUrl: "#", description: "Rewards Credit Card"},
        {imageUrl: "assets/credit card pics/Binary Cash.png", linkUrl: "#", description: "Cash Back Credit Card"},
        {imageUrl: "assets/credit card pics/Binary Air.png", linkUrl: "#", description: "Travel Credit Card"},
        {imageUrl: "assets/credit card pics/Binary Business.png", linkUrl: "#", description: "Business Credit Card"},
        {imageUrl: "assets/credit card pics/Binary Student.png", linkUrl: "#", description: "Starter Student Credit Card"},
        {imageUrl: "assets/credit card pics/Starter Secured.png", linkUrl: "#", description: "Starter Secured Credit Card"},
        {imageUrl: "assets/credit card pics/Binary Green.png", linkUrl: "#", description: "Starter Unsecured Credit Card"},
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
        case "starter student credit card":
            return CreditCardType.STARTER_STUDENT_CREDIT_CARD;
        case "starter student secure credit card":
            return CreditCardType.STARTER_SECURED_CREDIT_CARD;
        case "starter student unsecured credit card":
            return CreditCardType.STARTER_UNSECURED_CREDIT_CARD;
        default:
            return CreditCardType.OTHER_CREDIT_CARD;
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
            case CreditCardType.STARTER_STUDENT_CREDIT_CARD:
                return "Starter Student Credit Card";
            case CreditCardType.STARTER_SECURED_CREDIT_CARD:
                return "Starter Student Secure Credit Card";
            case CreditCardType.STARTER_UNSECURED_CREDIT_CARD:
                return "Starter Student Unsecure Credit Card";
            default:
                return "Other Credit Card";
        }
    }
