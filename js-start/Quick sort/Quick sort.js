var arr = new Array();
arr = [12, 121, -1, 14, -16, 28, 3, 8, 5, 0];

function sort(array)
{
	var left = new Array();
	var right = new Array();
	var middle = array[0];
	
		for (var i=1;i<=array.length-1;i++)
		{
			if (middle>array[i])
			left.push(array[i]);
			else
			right.push(array[i]);
		}
		console.log(left + ' :left');
		console.log(middle + ' :middle')
		console.log(right + ' :righ');
		console.log("-----");
		
		if (left.length>1)
		var a = sort(left);
		else a = left;
		
		if (right.length>1)
		var b = sort(right);
		else b = right;
		
		a=a.concat(middle, b);
		console.log("/-/-/: "+a);
		return a;
}

console.log("Out: " + sort(arr));