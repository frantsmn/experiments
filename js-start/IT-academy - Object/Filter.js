let array = [{}, { a: 1 }, { a: 1, b: 2 }, { b: 2 }, { c: 3 }, { a: 1, c: 3 }];
let obj = { a: 1 };
// let obj = { c: 3 };
// let obj = { c: 3, a: 2 };

function filter(array, obj) {
return array.filter(element => {
        for (var prop in obj) {
            if (obj[prop] !== element[prop]) {
                return false;
            };
        }
        return true;
    });
}

console.log(filter(array, obj));
