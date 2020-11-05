function getSum(tree) {
	let sum = 0;
	for (const key in tree) {
		if (tree.hasOwnProperty(key) && key === 'valueNode' && Number.isInteger(tree[key])) {
			sum += tree[key];
		}
		else if (tree.hasOwnProperty(key) && key === 'next' && tree[key] !== null) {
			tree[key].forEach(element => {
				sum += getSum(element);
			});
		}
	}
	return sum;
}



var tree1 = {
	valueNode: 1,
	next: [
		{
			valueNode: 3,
			next: null
		},
		{
			valueNode: 2,
			next: null
		}
	]
}

var tree = {
	valueNode: 3,
	next: [{
		valueNode: 1,
		next: null
	},
	{
		valueNode: 3,
		next: null
	},
	{
		valueNode: 2,
		next: null
	},
	{
		valueNode: 2,
		next: [
			{
				valueNode: 1,
				next: null
			},
			{
				valueNode: 5,
				next: null
			}
		]
	}]

};

console.log(getSum(tree1));
console.log(getSum(tree));