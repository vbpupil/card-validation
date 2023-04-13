export default class KeyFunctions {
    static KEYS = {
        "0": 48,
        "9": 57,
        "NUMPAD_0": 96,
        "NUMPAD_9": 105,
        "DELETE": 46,
        "BACKSPACE": 8,
        "ARROW_LEFT": 37,
        "ARROW_RIGHT": 39,
        "ARROW_UP": 38,
        "ARROW_DOWN": 40,
        "HOME": 36,
        "END": 35,
        "TAB": 9,
        "A": 65,
        "X": 88,
        "C": 67,
        "V": 86
    };

    static keyCodeFromEvent(e) {
        return e.which || e.keyCode;
    };

    static keyIsTopNumber(e) {
        const keyCode = this.keyCodeFromEvent(e);
        return keyCode >= this.KEYS["0"] && keyCode <= this.KEYS["9"];
    };

    static keyIsKeypadNumber(e) {
        const keyCode = this.keyCodeFromEvent(e);
        return keyCode >= this.KEYS["NUMPAD_0"] && keyCode <= this.KEYS["NUMPAD_9"];
    };

    static keyIsDelete(e) {
        return this.keyCodeFromEvent(e) === this.KEYS["DELETE"];
    }

    static keyIsNumber(e) {
        return this.keyIsTopNumber(e) || this.keyIsKeypadNumber(e);
    };

    static keyIsBackspace(e) {
        return this.keyCodeFromEvent(e) === this.KEYS["BACKSPACE"];
    };

    static keyIsDeletion(e) {
        return this.keyIsDelete(e) || this.keyIsBackspace(e);
    };

    static keyIsArrow(e) {
        const keyCode = this.keyCodeFromEvent(e);
        return keyCode >= this.KEYS["ARROW_LEFT"] && keyCode <= this.KEYS["ARROW_DOWN"];
    };

    static keyIsNavigation(e) {
        const keyCode = this.keyCodeFromEvent(e);
        return keyCode === this.KEYS["HOME"] || keyCode === this.KEYS["END"];
    };

    static keyIsKeyboardCommand(e) {
        const keyCode = this.keyCodeFromEvent(e);

        return this.keyIsCommandFromEvent(e) &&
            (
                keyCode === this.KEYS["A"] ||
                keyCode === this.KEYS["X"] ||
                keyCode === this.KEYS["C"] ||
                keyCode === this.KEYS["V"]
            );
    };

    static keyIsTab(e) {
        return this.keyCodeFromEvent(e) === this.KEYS["TAB"];
    };

    static keyIsCommandFromEvent(e) {
        return e.ctrlKey || e.metaKey;
    };

    static digitFromKeyCode(keyCode) {
        if (keyCode >= this.KEYS["0"] && keyCode <= this.KEYS["9"])
            return keyCode - this.KEYS["0"];

        if (keyCode >= this.KEYS["NUMPAD_0"] && keyCode <= this.KEYS["NUMPAD_9"])
            return keyCode - this.KEYS["NUMPAD_0"];

        return null;
    };
}