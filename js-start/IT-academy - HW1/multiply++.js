function multiply (param) {
    if (arguments.length) {
        this.tmp = this.tmp === undefined ? param : this.tmp * param;
        return multiply;
    } else {
        let a = this.tmp;
        this.tmp = undefined;
        return a
    }
}

console.log(multiply(2)(10)(3)(6)());           //360
console.log(multiply(1)(1)(1)(1)(2)(5)(1)());   //10
console.log(multiply(12)(1)(2)(1)());           //24