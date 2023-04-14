import Input from "./Input";
import CardType from "../Helpers/CardType";
import CardImages from "../Helpers/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";
import UnsupportedCardTypeError from "../Errors/UnsupportedCardTypeError";

export default class CardNumberInput extends Input {
    _id = 'cp-card-number-input'
    _placeholder = "Card Number";
    _cardType = null
    _cardTypeIcon = null
    _creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;
    _cardDetails = {};

    constructor(formWrapper, options) {
        super(formWrapper, options);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._input, 'name')) {
            this._input.setAttribute("name", "card-number");
        }

        if (!this.elementHasAttribute(this._input, 'placeholder')) {
            this._input.setAttribute("placeholder", this._placeholder);
        }

    }

    registerListeners() {
        this._input.addEventListener('keydown', this.handleCreditCardNumberKey.bind(this));
        this._input.addEventListener('keyup', this.setCardType.bind(this));
        this._input.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._input = document.getElementById(this._id);
        this._input.removeAttribute('type');
        this._input.setAttribute('type', 'tel');

        const wrapper = document.createElement('div');

        wrapper.id = 'card-number-wrapper';

        this._cardTypeIcon = document.createElement('div');
        this._cardTypeIcon.id = 'card-type-icon';

        if (this._options?.show_card_number_icon && this._options.show_card_number_icon === true) {
            const cardIcon = document.createElement('div');
            cardIcon.classList.add('cp-icon');
            cardIcon.innerHTML += CardImages.CARD_ICON;
            wrapper.append(cardIcon);
        }

        wrapper.append(this._input, this._cardTypeIcon);

        this._formWrapper.append(wrapper);
    }

    handleCreditCardNumberKey(e) {
        this.handleMaskedNumberInputKey(e, this._creditCardNumberMask);
    }

    handleCardChange(e) {
        const cardDetails = CardType.cardTypeFromNumber(e.target.value);

        if (this._options.excluded_card_providers !== undefined && Array.isArray(this._options.excluded_card_providers)) {
            if (this._options.excluded_card_providers.indexOf(cardDetails.type) !== -1) {
                throw new UnsupportedCardTypeError("Unsupported card type: " + cardDetails.type);
            }
        }
        this._cardDetails = cardDetails;
    }

    setCardType(e) {
        try {
            this.handleCardChange(e)

            this.emitCardChange(this._cardDetails);

            this._cardType = this._cardDetails.type;
            this._creditCardNumberMask = this._cardDetails.mask;

            this._cardTypeIcon.innerHTML = CardImages[this._cardType];
        } catch (err) {
            if (err instanceof UnknownCardTypeError) {
                this._cardTypeIcon.innerHTML = '';
            }

            if (err instanceof UnsupportedCardTypeError) {
                this.setError('ERROR', {input: this._id, message: err.message});
            }

            if (err instanceof InvalidCardNumberError) {
                this._cardTypeIcon.innerHTML = CardImages.EXCLAMATION;
                this.setError('ERROR', {input: this._id, message: 'Invalid card number.'});
            }

            this._creditCardNumberMask = CardType.CREDIT_CARD_NUMBER_DEFAULT_MASK;
            this.emitCardChange({cvv_mask: CardType.CVC_MASK_3});
        }
    }

    emitCardChange(data) {
        let event = new CustomEvent(
            'cp-card-change',
            {
                bubbles: true,
                cancelable: true,
                detail: data
            });

        window.dispatchEvent(event);
    }
}