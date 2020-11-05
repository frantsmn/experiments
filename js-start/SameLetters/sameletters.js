var arr = ['kot', 'tok', 'okt'];
var arr1 = ['kot', 'tok', 'ott'];

function sameLetters(arr) {
	const a = arr.map(word => word.split('').sort().join(''));
	for (let i = 0; i < a.length; i++) {
		console.log('>>', a[i]);
		if (a[i] !== a[0]) return false;
	}
	console.log(a);
	return true;
}

console.log(
	sameLetters(arr1)
);