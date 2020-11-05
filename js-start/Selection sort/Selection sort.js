var arr = new Array();
arr = [12, 121, -1, 14, -16, 28, 3, 8, 5, 0];

function min(array)
{
	var min = array[0]
	var index = 0
	for (var i=0;i<array.length-1;i++)
	if (min>array[i])
	{
		min = array[i]
		index = i
		console.log(min,index)
	}
	return index
}

function del(array, index)
{
	var rez = new Array()
	for (var i=0;i<array.length;i++)
	if (i!==index)
	rez.push(array[i])
	return rez
}

function sort(array)
{
	var rez = new Array();
	var len = array.length-1
	for(var i=0;i<len;i++)
	{
		rez.push(array[min(array)]);
		array = del(array, min(array));
	}
	return rez
}

console.log(sort(arr));