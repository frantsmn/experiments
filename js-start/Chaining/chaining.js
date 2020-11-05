//2. Реализовать методы, которые в процессе выполнения строки (2).plus(3).minus(1) дали бы на выходе 4.

Number.prototype.plus = function (num) {
	return this + num;
}

Number.prototype.minus = function (num) {
	return this - num;
}

console.log((2).plus(3).minus(1))