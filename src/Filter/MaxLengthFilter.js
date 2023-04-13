import Filter from "./Filter";

export default class MaxLengthFilter extends Filter {
    static filter(input) {
        return input;
    }

    static filtered(input, maxNumAllowedChars = 5) {
        console.log(input);

        if (input.length >= maxNumAllowedChars) {
            return input.slice(0, maxNumAllowedChars);
        }

        return input;
    }
}