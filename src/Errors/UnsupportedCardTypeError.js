export default class UnsupportedCardTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = 'UnsupportedCardTypeError';
    }
}