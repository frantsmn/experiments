// Написать собственную реализацию метода bind()
// function myBind(func, context, args) { return function };

const myBind = function (func, obj) {
    let bindArgs = Array.from(arguments).slice(2);
    return function () {
        let funcArgs = Array.from(arguments);
        return func.call(obj, ...bindArgs, ...funcArgs);
    }
}

//=============================================================
//  Привязка функции sayHi из obj1 к контексту obj2
//=============================================================

let obj1 = {
    name: "First object",
    sayHi: function (greeting) {
        console.log(greeting + ' from ' + this.name);
    }
}

let obj2 = {
    name: "Second object"
}

console.log(obj1.sayHi.bind(obj2, 'Hello')());
console.log(myBind(obj1.sayHi, obj2, 'Привет')());

//=============================================================
//  Multiply -> Double — Каррирование
//=============================================================

this.multiply = function (a, b) {
    return a * b;
}

//console.log("\n\nMultiply(2,5): " + this.multiply(2, 5));

const double = this.multiply.bind(null, 2);
const myDouble = myBind(this.multiply, null, 2);

console.log(double(4));
console.log(myDouble(7));