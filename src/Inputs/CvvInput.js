import Input from "./Input";
import CardType from "../Helpers/CardType";
import CardImages from "../Helpers/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";

export default class CvvInput extends Input {
    _id = 'cp-card-cvv-input'
    _placeholder = "CVV";
    _cardType = null
    _cardTypeIcon = null

    _creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;

    constructor(formWrapper, options) {
        super(formWrapper, options);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._cardNumInput, 'name')) {
            this._cardNumInput.setAttribute("name", "card-number");
        }

        if (!this.elementHasAttribute(this._cardNumInput, 'placeholder')) {
            this._cardNumInput.setAttribute("placeholder", this._placeholder);
        }
    }

    registerListeners() {
        this._cardNumInput.addEventListener('keydown', this.handleCreditCardNumberKey.bind(this));
        this._cardNumInput.addEventListener('keyup', this.setCardType.bind(this));
        this._cardNumInput.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._cardNumInput = document.getElementById(this._id);
        this._cardNumInput.removeAttribute('type');
        this._cardNumInput.setAttribute('type', 'tel');

        const wrapper = document.createElement('div');

        wrapper.id = 'cvv-wrapper';

        this._cardTypeIcon = document.createElement('div');
        this._cardTypeIcon.classList.add('card-type-icon');

        if (this._options?.show_cvv_icon && this._options.show_cvv_icon === true) {
            const cardIcon = document.createElement('div');
            cardIcon.classList.add('cp-icon');
            cardIcon.innerHTML += CardImages.LOCK_ICON;
            wrapper.append(cardIcon);
        }

        wrapper.append(this._cardNumInput);

        this._formWrapper.append(wrapper);
    }

    handleCreditCardNumberKey(e) {
        this.handleMaskedNumberInputKey(e, this._creditCardNumberMask);
    }

    setCardType(event) {
        try {
            this.setError('');

            const type = CardType.cardTypeFromNumber(event.target.value);

            this._cardType = type.type;
            this._creditCardNumberMask = type.mask;

            this._cardTypeIcon.innerHTML = CardImages[this._cardType];
        } catch (err) {
            if (err instanceof UnknownCardTypeError) {
                this._cardTypeIcon.innerHTML = '';
            }

            if (err instanceof InvalidCardNumberError) {
                this._cardTypeIcon.innerHTML = CardImages.EXCLAMATION;
                this.setError('Invalid card number.');
            }

            this._creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;
        }
    }
}