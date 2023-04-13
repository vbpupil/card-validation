import KeyFunctions from "../Keyboard/KeyFunctions";

export default class Input {
    _class;
    _requiredMethods = ['registerListeners', 'setWrapper'];

    constructor() {
        if (new.target === Input) {
            throw new TypeError("Cannot construct Input instances directly.");
        }

        this._requiredMethods.forEach(method => {
            if (this[method] === undefined) {
                throw new TypeError(`Missing required method: ${method}`);
            }
        })
    }

    init() {
        if (!document.querySelector(this._class)) {
            console.error(`Unable to locate input with class of ${this._class}, abandoning card validation.`)
            return false;
        }

        this.setWrapper();
        this.registerListeners();
    }

    setError(message) {
        this._errorMessageContainer.innerHTML = message;
    }

    caretStartPosition(element) {
        if (typeof element.selectionStart == "number") {
            return element.selectionStart;
        }
        return false;
    };

    caretEndPosition(element) {
        if (typeof element.selectionEnd == "number") {
            return element.selectionEnd;
        }
        return false;
    };

    normaliseCaretPosition(mask, caretPosition) {
        let numberPos = 0;

        if (caretPosition < 0 || caretPosition > mask.length)
            return 0;


        for (let i = 0; i < mask.length; i++) {
            if (i === caretPosition) {
                return numberPos;
            }
            if (mask[i] === "X") {
                numberPos++;
            }
        }

        return numberPos;
    };

    deNormaliseCaretPosition(mask, caretPosition) {
        let numberPos = 0;

        if (caretPosition < 0 || caretPosition > mask.length)
            return 0;

        for (let i = 0; i < mask.length; i++) {
            if (numberPos === caretPosition) {
                return i;
            }
            if (mask[i] === "X") {
                numberPos++;
            }
        }

        return mask.length;
    };

    setCaretPosition(element, caretPos) {
        if (element != null) {
            if (element.createTextRange) {
                let range = element.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (element.selectionStart) {
                    element.focus();
                    element.setSelectionRange(caretPos, caretPos);
                } else {
                    element.focus();
                }
            }
        }
    };

    filterNumberOnlyKey(e) {
        const isNumber = KeyFunctions.keyIsNumber(e);
        const isDeletion = KeyFunctions.keyIsDeletion(e);
        const isArrow = KeyFunctions.keyIsArrow(e);
        const isNavigation = KeyFunctions.keyIsNavigation(e);
        const isKeyboardCommand = KeyFunctions.keyIsKeyboardCommand(e);
        const isTab = KeyFunctions.keyIsTab(e);

        if (!isNumber && !isDeletion && !isArrow && !isNavigation && !isKeyboardCommand && !isTab) {
            e.preventDefault();
        }
    };

    numbersOnlyString(string) {
        let numbersOnlyString = "";

        for (let i = 0; i < string.length; i++) {
            let currentChar = string.charAt(i);
            let isValid = !isNaN(parseInt(currentChar));

            if (isValid)
                numbersOnlyString += currentChar;
        }

        return numbersOnlyString;
    };
}