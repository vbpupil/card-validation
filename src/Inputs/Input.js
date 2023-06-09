import KeyFunctions from "../Helpers/KeyFunctions";
import Mask from "../Helpers/Mask";

export default class Input {
    _options = {};

    _id;
    _requiredMethods = ['registerListeners', 'constructInput'];

    _formWrapper = null;
    _input = null;

    constructor(formWrapper, options) {
        this._options = options;

        this._formWrapper = formWrapper;

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
        if (!document.getElementById(this._id)) {
            console.error(`Unable to locate input with id of ${this._id}, abandoning card validation.`)
            return false;
        }

        this.constructInput();
        this.registerListeners();

        return true;
    }

    clearInput() {
        this._input.value = '';
    }

    setError(type = 'error', data = {}) {
        console.log(type, data)

        let event = new CustomEvent(
            'cp-form-event',
            {
                bubbles: true,
                cancelable: true,
                detail: {
                    type: type,
                    data: data,
                }
            });

        window.dispatchEvent(event);
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

    elementHasAttribute(element, attributeName) {
        return element.hasAttribute(attributeName) && element.getAttribute(attributeName) !== '';
    };

    handleMaskedNumberInputKey(e, mask) {
        this.filterNumberOnlyKey(e);

        const keyCode = e.which || e.keyCode;

        const element = e.target;

        const caretStart = this.caretStartPosition(element);
        const caretEnd = this.caretEndPosition(element);

        // Calculate normalised caret position
        const normalisedStartCaretPosition = this.normaliseCaretPosition(mask, caretStart);
        const normalisedEndCaretPosition = this.normaliseCaretPosition(mask, caretEnd);

        let newCaretPosition = caretStart;

        const isNumber = KeyFunctions.keyIsNumber(e);
        const isDelete = KeyFunctions.keyIsDelete(e);
        const isBackspace = KeyFunctions.keyIsBackspace(e);

        if (isNumber || isDelete || isBackspace) {
            e.preventDefault();

            const rawText = element.value;

            let numbersOnly = this.numbersOnlyString(rawText);

            const digit = KeyFunctions.digitFromKeyCode(keyCode);

            const rangeHighlighted = normalisedEndCaretPosition > normalisedStartCaretPosition;

            // Remove values highlighted (if highlighted)
            if (rangeHighlighted) {
                numbersOnly = (numbersOnly.slice(0, normalisedStartCaretPosition) + numbersOnly.slice(normalisedEndCaretPosition));
            }

            // Forward Action
            if (caretStart !== mask.length) {
                // Insert number digit
                if (isNumber && rawText.length <= mask.length) {
                    numbersOnly = (numbersOnly.slice(0, normalisedStartCaretPosition) + digit + numbersOnly.slice(normalisedStartCaretPosition));
                    newCaretPosition = Math.max(
                        this.deNormaliseCaretPosition(mask, normalisedStartCaretPosition + 1),
                        this.deNormaliseCaretPosition(mask, normalisedStartCaretPosition + 2) - 1
                    );
                }

                // Delete
                if (isDelete) {
                    numbersOnly = (numbersOnly.slice(0, normalisedStartCaretPosition) + numbersOnly.slice(normalisedStartCaretPosition + 1));
                }
            }

            // Backward Action
            if (caretStart !== 0) {
                // Backspace
                if (isBackspace && !rangeHighlighted) {
                    numbersOnly = (numbersOnly.slice(0, normalisedStartCaretPosition - 1) + numbersOnly.slice(normalisedStartCaretPosition));
                    newCaretPosition = this.deNormaliseCaretPosition(mask, normalisedStartCaretPosition - 1);
                }
            }

            this._input.value = Mask.applyFormatMask(numbersOnly, mask);
            this.setCaretPosition(element, newCaretPosition);
        }
    };
}