export default class UnknownCardTypeError extends Error {
    constructor(message) {
        super(message);

        this.name = 'UnknownCardTypeError';
    }
}