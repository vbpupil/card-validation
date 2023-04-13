import Input from "./Input";
import CardType from "../CardType/CardType";
import CardImages from "../Images/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";
import KeyFunctions from "../Keyboard/KeyFunctions";
import Mask from "../Mask/Mask";

export default class CardNumberInput extends Input {
    _CREDIT_CARD_NUMBER_PLACEHOLDER = "Card Number";
    _class = '.cp-card-input'
    _cardType = null
    _cardTypeIcon = null

    _errorMessageContainer = null;

    _creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;

    constructor() {
        super();

        this.init();

        if (!this.elementHasAttribute(this._cardNumInput, 'name')) {
            this._cardNumInput.setAttribute("name", "card-number");
        }

        if (!this.elementHasAttribute(this._cardNumInput, 'placeholder')) {
            this._cardNumInput.setAttribute("placeholder", this._CREDIT_CARD_NUMBER_PLACEHOLDER);
        }
    }

    registerListeners() {
        this._cardNumInput.addEventListener('keydown', this.handleCreditCardNumberKey.bind(this));
        this._cardNumInput.addEventListener('keyup', this.setCardTypeIcon.bind(this));
        this._cardNumInput.addEventListener('paste', e => e.preventDefault());
    }

    setWrapper() {
        this._cardNumInput = document.querySelector(this._class);
        this._cardNumInput.removeAttribute('type');
        this._cardNumInput.setAttribute('type', 'tel');

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

    handleCreditCardNumberKey(e) {
        this.handleMaskedNumberInputKey(e, this._creditCardNumberMask);
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
                this.setError('Invalid card number.');
            }
        }
    }
}