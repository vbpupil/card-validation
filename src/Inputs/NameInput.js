import Input from "./Input";
import CardImages from "../Helpers/CardImages";

export default class NameInput extends Input {
    _placeholder = "Name On Card";

    _id = 'cp-card-name-input'

    constructor(formWrapper, options) {
        super(formWrapper, options);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._input, 'name')) {
            this._input.setAttribute("name", "card-name");
        }

        if (!this.elementHasAttribute(this._input, 'placeholder')) {
            this._input.setAttribute("placeholder", this._placeholder);
        }
    }

    registerListeners() {
        this._input.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._input = document.getElementById(this._id);
        this._input.removeAttribute('type');
        this._input.setAttribute('type', 'text');

        const wrapper = document.createElement('div');

        wrapper.id = 'name-wrapper';

        if (this._options?.show_name_icon && this._options.show_name_icon === true) {
            const cardIcon = document.createElement('div');
            cardIcon.classList.add('cp-icon');
            cardIcon.innerHTML += CardImages.USER_ICON;
            wrapper.append(cardIcon);
        }

        wrapper.append( this._input);

        this._formWrapper.append(wrapper);
    }
}