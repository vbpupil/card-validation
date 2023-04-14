import CardNumberInput from "./Inputs/CardNumberInput";
import Css from "./Styles/Css";
import NameInput from "./Inputs/NameInput";
import ExpiryInput from "./Inputs/ExpiryInput";
import CvvInput from "./Inputs/CvvInput";

export default class CardForm {
    _options = {};
    _formWrapper = null;
    _cardNumElement = null;
    _cardNameInput = null;
    _cardExpiryInput = null;
    _cardCVVInput = null;
    _errors = {}

    constructor(options = {}) {
        this._options = options;

        this.initialiseForm();

        this.injectCss();
    }

    initialiseForm() {
        this._formWrapper = document.getElementById('cp-form-wrapper');

        this._cardNumElement = new CardNumberInput(this._formWrapper, this._options);

        const inlineWrapper = document.createElement('div');
        inlineWrapper.id = 'cp-inline-wrapper';

        this._formWrapper.append(inlineWrapper);

        this._cardExpiryInput = new ExpiryInput(inlineWrapper, this._options);
        this._cardCVVInput = new CvvInput(inlineWrapper, this._options);

        this._cardNameInput = new NameInput(this._formWrapper, this._options);
    }

    injectCss() {
        const style = document.createElement('style');

        style.innerHTML = Css.STYLE;

        const ref = document.querySelector('script');

        ref.parentNode.insertBefore(style, ref);
    }
}