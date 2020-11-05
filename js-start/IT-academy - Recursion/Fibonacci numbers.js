// (Цикл) | Выводит последовательность Фибоначчи до n элемента
// let n = 10;
// let array = [];

// for (let i = 0; i < n; i++) {
//     if (array.length > 1) {
//         array[i] = array[i - 2] + array[i - 1];
//     } else if (array.length > 0) {
//         array[1] = 1;
//     } else if (!array.length) {
//         array[0] = 0;
//     }
// }
// console.log(array);


// (Рекурсия) | Выводит последовательность Фибоначчи до n элемента

// function printFib(n, a) {
//     a = a ? a : [0];
//     if (a.length < n) {
//         if (a.length > 1) {
//             a.push(a[a.length - 1] + a[a.length - 2]);
//         } else if (a.length === 1) {
//             a.push(1);
//         }
//         return printFib(n, a);
//     } else
//         return a;
// }






//Вывести число Фибоначчи по порядковому номеру

// function printFib(n, e1 = 0, e2 = 1) {
//     if (n > 1) {
//         return printFib(n - 1, e2, e1 + e2);
//     }
//     else return e1;
// }

function printFib(n, e1 = 0, e2 = 1) {
    return n > 1 ? printFib(n - 1, e2, e1 + e2) : e1;
}

console.log(printFib(18)); //1597

//Фибоначчи:        0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181
//Порядк. номер:    1  2  3  4  5  6  7   8   9  10  11  12   13   14   15   16   17    18    19    20





//Сумма чисел Фибоначчи

// function sumFib(n, e1 = 0, e2 = 1) {
//     if (n > 1) {
//         return e1 += sumFib(n - 1, e2, e1 + e2)
//     }
//     else {
//         return 0;
//     }
// }

function sumFib(n, e1 = 0, e2 = 1) {
    return e1 += n > 1 ? sumFib(n - 1, e2, e1 + e2) : 0;
}

console.log(sumFib(7));     //20
console.log(sumFib(10));    //88

//0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181