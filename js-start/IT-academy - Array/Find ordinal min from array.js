// let array = [1, 1, 2];               //undefined
// let array = [1, 1, 1, 2];            //undefined
// let array = [1, 2, 3, 3];            //3
// let array = [1, 1, 2, 2, 7, 8];      //7

let array = [6, 12, 3, 12.3, 16, 4, 10, -1.5];

//Функция нахождения минимального числа в массиве
function findMin(array) {
    let min;
    array.forEach((item) => {
        min = min < item ? min : item;
    });
    return min;
}

//Найти n-ное по величине число в массиве
function findOrdinalMin(array, n) {
    for (; n - 1 > 0; n--) {
        array = array.filter((number) => {
            return number > findMin(array);
        });
    }
    return findMin(array);
}

// console.log(findOrdinalMin(array, 3));


//Функция нахождения минимального числа в массиве (за один проход)
function find3rdMin(array) {
    let min1 = array[0];
    let min2;
    let min3;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < min1) {
            min3 = min2;
            min2 = min1;
            min1 = array[i];
        } else if (array[i] > min1 && (array[i] < min2 || !min2)) {
            min3 = min2;
            min2 = array[i];
        } else if (array[i] > min2 && (array[i] < min3 || !min3)) {
            min3 = array[i];
        }
    }
    return min3;
}

console.log(find3rdMin(array));