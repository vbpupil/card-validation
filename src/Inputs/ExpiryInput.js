import Input from "./Input";
import CardType from "../Helpers/CardType";
import CardImages from "../Helpers/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";
import Mask from "../Helpers/Mask";

export default class ExpiryInput extends Input {
    _id = 'cp-card-expiry-input'
    _placeholder = "MM / YY";
    _cardType = null
    _cardTypeIcon = null

    _creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;

    constructor(formWrapper, options) {
        super(formWrapper, options);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._cardNumInput, 'name')) {
            this._cardNumInput.setAttribute("name", "card-expiry");
        }

        if (!this.elementHasAttribute(this._cardNumInput, 'placeholder')) {
            this._cardNumInput.setAttribute("placeholder", this._placeholder);
        }
    }

    registerListeners() {
        this._cardNumInput.addEventListener('keydown', this.handleExpiryKey.bind(this));
        this._cardNumInput.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._cardNumInput = document.getElementById(this._id);
        this._cardNumInput.removeAttribute('type');
        this._cardNumInput.setAttribute('type', 'tel');

        const wrapper = document.createElement('div');

        wrapper.id = 'expiry-wrapper';

        if (this._options?.show_expiry_icon && this._options.show_expiry_icon === true) {
            const cardIcon = document.createElement('div');
            cardIcon.classList.add('cp-icon');
            cardIcon.innerHTML += CardImages.CALENDAR_ICON;
            wrapper.append(cardIcon);
        }

        wrapper.append(this._cardNumInput);

        this._formWrapper.append(wrapper);
    }

    handleExpiryKey(e) {
        this.handleMaskedNumberInputKey(e, Mask.EXPIRY_MASK);
    }
}