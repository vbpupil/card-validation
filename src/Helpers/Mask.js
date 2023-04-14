export default class Mask {
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