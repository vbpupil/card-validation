import Input from "./Input";
import CardType from "../CardType/CardType";
import CardImages from "../Images/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";
import MaxLengthFilter from "../Filter/MaxLengthFilter";
import KeyFunctions from "../Keyboard/KeyFunctions";
import Mask from "../Mask/Mask";

export default class CardNumberInput extends Input {
    _class = '.cp-card-input'
    _cardType = null
    _cardTypeIcon = null

    _errorMessageContainer = null;

    _creditCardNumberMask = Mask.CREDIT_CARD_NUMBER_DEFAULT_MASK;

    constructor() {
        super();

        this.init();
    }

    registerListeners() {
        this._cardNumInput.addEventListener('keyup', this.handleMaskedNumberInputKey.bind(this));
        // this._cardNumInput.addEventListener('keydown', this.limitInput.bind(this));
        this._cardNumInput.addEventListener('keyup', this.setCardTypeIcon.bind(this));
        this._cardNumInput.addEventListener('paste', e => e.preventDefault());
    }

    setWrapper() {
        this._cardNumInput = document.querySelector(this._class);
        this._cardNumInput.removeAttribute('type');
        this._cardNumInput.setAttribute('type', 'number');

        const wrapper = document.createElement('div');

        wrapper.classList.add('card-wrapper');

        this._cardTypeIcon = document.createElement('div');
        this._cardTypeIcon.classList.add('card-type-icon');

        this._errorMessageContainer = document.createElement('div');
        this._errorMessageContainer.classList.add('error-wrapper');

        const cardIcon = document.createElement('div');
        cardIcon.classList.add('icon');
        cardIcon.innerHTML += CardImages.CARD_ICON;

        wrapper.append(cardIcon, this._cardNumInput, this._cardTypeIcon, this._errorMessageContainer);

        document.body.append(wrapper);
    }

    handleMaskedNumberInputKey(e) {
        const mask = this._creditCardNumberMask;

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

            this._cardNumInput.value = Mask.applyFormatMask(numbersOnly, mask);
            this.setCaretPosition(element, newCaretPosition);
        }
    };


    limitInput(event) {
        event.target.value = MaxLengthFilter.filtered(event.target.value, 15);
        // event.target.value = CardNumberMask.masked(MaxLengthFilter.filtered(event.target.value, 15));
    }

    setCardTypeIcon(event) {
        try {
            this.setError('');
            this._cardType = CardType.cardTypeFromNumber(event.target.value);

            this._cardTypeIcon.innerHTML = CardImages[this._cardType];
        } catch (err) {
            if (err instanceof UnknownCardTypeError) {
                this._cardTypeIcon.innerHTML = '';
            }

            if (err instanceof InvalidCardNumberError) {
                this._cardTypeIcon.innerHTML = CardImages.EXCLAMATION;
                this.setError('Your card number is invalid.');
            }

            // console.log(err)
        }
    }
}