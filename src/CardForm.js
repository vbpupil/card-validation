import CardNumberInput from "./Inputs/CardNumberInput";
import Css from "./Styles/Css";

export default class CardForm {
    _cardNumInput
    _errors = {}

    constructor() {
        this.initialiseForm();
        this.injectCss();
    }

    initialiseForm(){
        this._cardNumInput = new CardNumberInput();
    }

    injectCss(){
        const style = document.createElement('style');

        style.innerHTML = Css.STYLE;

        const ref = document.querySelector('script');

        ref.parentNode.insertBefore(style, ref);
    }
}