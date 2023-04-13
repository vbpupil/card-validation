import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";

export default class CardType {
    static CREDIT_CARD_NUMBER_DEFAULT_MASK    = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_VISA_MASK       = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_MASTERCARD_MASK = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_DISCOVER_MASK   = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_JCB_MASK        = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_AMEX_MASK       = "XXXX XXXXXX XXXXX";
    static CREDIT_CARD_NUMBER_DINERS_MASK     = "XXXX XXXX XXXX XX";
    static cardTypeFromNumber(number) {
        // Diners - Carte Blanche
        if (/^30[0-5]/.test(number))
            return "DINERS_CLUB";

        // Diners
        if (/^(30[6-9]|36|38)/.test(number))
            return "DINERS_CLUB";

        // JCB
        if (/^35(2[89]|[3-8][0-9])/.test(number))
            return "JCB";

        // AMEX
        if (/^3[47]/.test(number))
            return "AMEX"

        // Visa Electron
        if (/^(4026|417500|4508|4844|491(3|7))/.test(number))
            return "VISA_ELECTRON";

        // Visa
        if (/^4/.test(number))
            return "VISA";

        // Mastercard
        if (/^5[1-5]/.test(number))
            return "MASTERCARD";

        // Discover
        if (/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/.test(number))
            return "DISCOVER";

        if(number.length >= 16){
            throw new InvalidCardNumberError('Invalid Card Number')
        }

        throw new UnknownCardTypeError('Unknown Card Type.');
    }
}
