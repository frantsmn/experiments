
var arr = [{ date: '10.01.2017' }, { date: '05.11.2016' }, { date: '21.13.2002' }];

arr.sort((a, b) => {
	if (+new Date(a.date) > +new Date(b.date))
		return 1
	else return -1;
})

console.log(arr[0]);
