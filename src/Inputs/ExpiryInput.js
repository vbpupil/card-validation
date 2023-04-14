import Input from "./Input";
import CardImages from "../Helpers/CardImages";

export default class ExpiryInput extends Input {
    _id = 'cp-card-expiry-input'
    _placeholder = "MM / YY";
    _expiryMask = "XX / XX";

    constructor(formWrapper, options) {
        super(formWrapper, options);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._input, 'name')) {
            this._input.setAttribute("name", "card-expiry");
        }

        if (!this.elementHasAttribute(this._input, 'placeholder')) {
            this._input.setAttribute("placeholder", this._placeholder);
        }
    }

    registerListeners() {
        this._input.addEventListener('keydown', this.handleExpiryKey.bind(this));
        this._input.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._input = document.getElementById(this._id);
        this._input.removeAttribute('type');
        this._input.setAttribute('type', 'tel');

        const wrapper = document.createElement('div');

        wrapper.id = 'expiry-wrapper';

        if (this._options?.show_expiry_icon && this._options.show_expiry_icon === true) {
            const cardIcon = document.createElement('div');
            cardIcon.classList.add('cp-icon');
            cardIcon.innerHTML += CardImages.CALENDAR_ICON;
            wrapper.append(cardIcon);
        }

        wrapper.append(this._input);

        this._formWrapper.append(wrapper);
    }

    handleExpiryKey(e) {
        this.handleMaskedNumberInputKey(e, this._expiryMask);
    }
}