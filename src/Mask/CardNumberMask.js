import Mask from "./Mask";

export default class CardNumberMask extends Mask {
    static mask_5 = /(\d{3})(\d{4})(\d{4})(\d{3})/;

    static mask_14 = /(\d{3})(\d{4})(\d{4})(\d{3})/;

    static mask_15 = /(\d{4})(\d{4})(\d{4})(\d{3})/;

    static mask_16 = /(\d{1,2,3,4})(\d{1,2,3,4})(\d{1,2,3,4})(\d{1,2,3,4})/;

    static mask_17 = /(\d{4})(\d{4})(\d{4})(\d{5})/;

    static mask_18 = /(\d{4})(\d{4})(\d{5})(\d{5})/;

    static mask_19 = /(\d{4})(\d{4})(\d{5})(\d{6})/;


    static masked(string) {
        console.log(string)
        console.log(string.replace(this.mask_16, "$1-$2-$3-$4"))
        return string.replace(this.mask_16, "$1-$2-$3-$4");
    }
}