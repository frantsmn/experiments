let array = [1, 2, 3, 1, 8, 4, 5, 2, 3, 4, 5, 1];

inRange = (a, b) => {
    return (item) => {
        return item >= a && item <=b;
    }
}

console.log(array.filter(inRange(1,2)));