export default class InvalidMonthError extends Error {
    constructor(message) {
        super(message);

        this.name = 'InvalidMonthError';
    }
}