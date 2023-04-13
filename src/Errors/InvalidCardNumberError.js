export default class InvalidCardNumberError extends Error {
    constructor(message) {
        super(message);

        this.name = 'InvalidCardNumberError';
    }
}