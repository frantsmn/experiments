let multiply = (num) => {
    return (next) => {
        return num * next;
    }
}

console.log(multiply(2)(10)); //20
console.log(multiply(1)(2)); //2
console.log(multiply(5)(4)); //20