//Функция целочисленного деления
function div(a, b){
    return (a - a%b)/b
}

//Array generate
var array = new Array();
for (var i=0;i<256;i++)
	array[i]=i+1;

//Array output
console.log("Array: " + array + "\n");

//Parameters and variables
var number = 16; //Запрашиваемое число
var attempts = 0; //Кол-во попыток
var min = 0, max = array.length-1; //Минимум и максимум диапазона поиска

//Search with attempt counter
while (min!==max)
{
	console.log("Attempt #" + (++attempts) + "\nRange: [" + min + ".." + max + "]\n");

	if (array[div(min+max,2)]>number) //Если искомое число меньше
		max=div(min+max,2)-1 //Обновили максимум
	else
	if (array[div(min+max,2)]<number) //Если искомое число больше
		min=div(min+max,2)+1 //Обновили минимум
	else
	if (array[div(min+max,2)]==number)
	{	
		break
	}
}
console.log("array[" + (div(min+max,2)) + "] = " + number);