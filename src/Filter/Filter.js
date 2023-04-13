export default class Filter{
    _requiredMethods = ['filter', 'filtered'];

    constructor() {
        if (new.target === Filter) {
            throw new TypeError("Cannot construct Filter instances directly.");
        }

        this._requiredMethods.forEach(method => {
            if (this[method] === undefined) {
                throw new TypeError(`Missing required method: ${method}`);
            }
        })
    }
}