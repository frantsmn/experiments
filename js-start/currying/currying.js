//Реализовать функцию f: f(2, 3) -> 5, при вызове f(2)(3), тоже вернет 5

function f(...args) {
	if (args.length === 1)
		return function (b) {
			return args[0] + b;
		}
	return args.reduce((val, item) => val += item)
}

console.log(f(2, 3));


//Более сложный вариант.
//f(1)(2)(3)() -> 6, f(0)(3)(1)(5)() -> 8



function dd(a) {
	let res = 0 + a;

	const func = function (a) {
		if (a !== undefined) {
			res += a;
			return func;
		} else {
			return res;
		}
	}

	return func;
}

console.log(dd(1)(2)(3)());
