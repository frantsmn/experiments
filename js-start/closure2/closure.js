const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
	setTimeout(function (i_local) {
		return function () {
			console.log('Index: ' + i_local + ', element: ' + arr[i_local]);
		}
	}(i), 30);
}