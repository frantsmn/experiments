//Сумма цифр числа используя рекурсию

// function digitSumm(number) {
//     if (number) {
//         return number % 10 + digitSumm(parseInt(number / 10));
//     }
//     return 0;
// }

function digitSumm(number) {
    return number ? number % 10 + digitSumm((number - number % 10) / 10) : 0;
}

console.log(digitSumm(73001));
