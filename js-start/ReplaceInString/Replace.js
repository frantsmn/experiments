// 4. Дана функция, она принимает в качестве аргументов строки '*', '1', 'b', '1c', реализуйте ее так, что бы она вернула строку '1*b*1c'

function str(mod, ...arr) {
	let res = '';
	for (let i = 0; i < arr.length - 1; i++) {
		res = String.prototype.concat(res, arr[i], mod);
	}
	return String.prototype.concat(res, arr[arr.length - 1])
}



const str2 = (mod, ...arr) => arr.join(mod);

console.log(str2('*', '1', 'b', '1c'));
