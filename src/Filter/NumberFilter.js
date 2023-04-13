export default class NumberFilter {
    static filter(input){
        return /^\d+$/.test(input)
    }

    static filterOut(input){
        if(!this.filter(input)){
            return input.replace(/\D/g,'');
        }

        return input;
    }
}