import CardNumberInput from "./Inputs/CardNumberInput";
import Css from "./Styles/Css";
import NameInput from "./Inputs/NameInput";
import ExpiryInput from "./Inputs/ExpiryInput";
import CvvInput from "./Inputs/CvvInput";

export default class CardForm {
    _formWrapper = null;
    _cardNumInput = null;
    _cardNameInput = null;
    _cardExpiryInput = null;
    _cardCVVInput = null;
    _errors = {}

    constructor() {
        this.initialiseForm();
        this.injectCss();
    }

    initialiseForm() {
        this.constructForm();

        this._cardNumInput = new CardNumberInput(this._formWrapper);
        this._cardNameInput = new NameInput(this._formWrapper);
        this._cardExpiryInput = new ExpiryInput(this._formWrapper);
        this._cardCVVInput = new CvvInput(this._formWrapper);
    }

    constructForm() {
        this._formWrapper = document.createElement('div');
        this._formWrapper.id = 'cp-form-wrapper'

        document.body.append(this._formWrapper);
    }

    injectCss() {
        const style = document.createElement('style');

        style.innerHTML = Css.STYLE;

        const ref = document.querySelector('script');

        ref.parentNode.insertBefore(style, ref);
    }
}