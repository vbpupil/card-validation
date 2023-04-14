import Input from "./Input";
import CardType from "../Helpers/CardType";
import CardImages from "../Helpers/CardImages";
import UnknownCardTypeError from "../Errors/UnknownCardTypeError";
import InvalidCardNumberError from "../Errors/InvalidCardNumberError";

export default class NameInput extends Input {
    _placeholder = "Name On Card";

    _id = 'cp-card-name-input'

    constructor(formWrapper) {
        super(formWrapper);

        if (!this.init())
            return;

        if (!this.elementHasAttribute(this._cardNameInput, 'name')) {
            this._cardNameInput.setAttribute("name", "card-name");
        }

        if (!this.elementHasAttribute(this._cardNameInput, 'placeholder')) {
            this._cardNameInput.setAttribute("placeholder", this._placeholder);
        }
    }

    registerListeners() {
        this._cardNameInput.addEventListener('paste', e => e.preventDefault());
    }

    constructInput() {
        this._cardNameInput = document.getElementById(this._id);
        this._cardNameInput.removeAttribute('type');
        this._cardNameInput.setAttribute('type', 'text');

        const wrapper = document.createElement('div');

        wrapper.id = 'name-wrapper';

        const cardIcon = document.createElement('div');
        cardIcon.classList.add('cp-icon');
        cardIcon.innerHTML += CardImages.USER_ICON;

        wrapper.append(cardIcon, this._cardNameInput);

        this._formWrapper.append(wrapper);
    }
}