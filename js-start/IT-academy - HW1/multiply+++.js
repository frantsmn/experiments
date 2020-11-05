function multiply(param) {
    var result = param;
    function func(next) {
        result *= next;
      return func;
    }
    // Происходит подмена метода .toString() в объекте func
    // При вызове этого метода из console.log(), функция .toString() будет возвращать значение result из multiply(){...}
    // Но все это не работает в среде Node.js
    func.toString = function() {
      return result;
    };
    return func;
  }

console.log(multiply(2)(10)(3)(6));           //360
console.log(multiply(1)(1)(1)(1)(2)(5)(1));   //10
console.log(multiply(12)(1)(2)(1));           //24