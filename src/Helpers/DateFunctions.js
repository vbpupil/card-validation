export default class DateFunctions {
    static getCurrentYear(digits = 4) {
        digits = Math.abs(digits);

        const d = new Date();

        if (digits === 4) {
            return d.getFullYear();
        }

        return d.getFullYear().toString().substring(2);
    }

    static getCurrentMonth() {
        return (new Date()).getMonth();
    }


}