export default class InvalidExpiryError extends Error {
    constructor(message) {
        super(message);

        this.name = 'InvalidExpiryError';
    }
}