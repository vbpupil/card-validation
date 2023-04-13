export default class Mask {
    static CREDIT_CARD_NUMBER_DEFAULT_MASK    = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_VISA_MASK       = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_MASTERCARD_MASK = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_DISCOVER_MASK   = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_JCB_MASK        = "XXXX XXXX XXXX XXXX";
    static CREDIT_CARD_NUMBER_AMEX_MASK       = "XXXX XXXXXX XXXXX";
    static CREDIT_CARD_NUMBER_DINERS_MASK     = "XXXX XXXX XXXX XX";

    static applyFormatMask(string, mask) {
        let formattedString = "";

        let numberPos = 0;

        for (let j = 0; j < mask.length; j++) {
            let currentMaskChar = mask[j];
            if (currentMaskChar === "X") {
                let digit = string.charAt(numberPos);

                if (!digit)
                    break;

                formattedString += string.charAt(numberPos);

                numberPos++;
            } else {
                formattedString += currentMaskChar;
            }
        }

        return formattedString;
    };
}