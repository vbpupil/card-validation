import Input from "./Input";
import CardType from "../Helpers/CardType";
import CardImages from "../Helpers/CardImages";

export default class CvvInput extends Input {
    _id = 'cp-card-cvv-input'
    _placeholder = "CVV";
    _cardType = null
    _cardTypeIcon = null

    _cvvMask = CardType.CVC_MASK_3;

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
        this._input.addEventListener('paste', e => e.preventDefault());
        window.addEventListener('cp-card-change', this.handleCardChange.bind(this));
    }

    constructInput() {
        this._input = document.getElementById(this._id);
        this._input.removeAttribute('type');
        this._input.setAttribute('type', 'tel');

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

        wrapper.append(this._input);

        this._formWrapper.append(wrapper);
    }

    handleCreditCardNumberKey(e) {
        this.handleMaskedNumberInputKey(e, this._cvvMask);
    }

    handleCardChange(e) {
        const newCvvMask = e?.detail?.cvv_mask ?? CardType.CVC_MASK_3;

        if (this._cvvMask !== newCvvMask)
            this.clearInput();

        this._cvvMask = newCvvMask;
    }
}