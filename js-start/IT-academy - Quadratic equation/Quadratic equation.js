function solveQuadratic(a, b, c) {
    //Уравнение линейно
    if (a === 0 && b !== 0) {
        return {
            x1: -c / b
        };
        //Бесконечное кол-во решений
    } else if (a === 0 && b === 0) {
        return {};
    } else {
        const d = b * b - 4 * a * c;
        //Действительные корни
        if (d > 0) {
            return {
                x1: (-b - Math.sqrt(d)) / (2 * a),
                x2: (-b + Math.sqrt(d)) / (2 * a)
            }
            //Действительные корни совпадают
        } else if (d === 0) {
            return {
                x1: -b / 2 * a,
                x2: -b / 2 * a
            }
            //Дискриминант меньше нуля
        } else if (d < 0) {
            return {};
        }
    }
}

function solveQuadraticToString(a, b, c) {
    let str = `Бесконечное количество решений, либо дискриминант меньше нуля и уравнение не имеет решений`;
    let x1 = solveQuadratic(a, b, c).x1;
    let x2 = solveQuadratic(a, b, c).x2;
    if (x1 !== undefined && x2 !== undefined) {
        str = x1 === x2 ? `Действительные корни совпадают: x1=${x1}, x2=${x2}` : `Действительные корни: x1=${x1}, x2=${x2}`;
    } else if (x1 !== undefined) {
        str = `Уравнение линейно. Корень: x=${x1}`;
    }
    return str;
}

console.log(solveQuadraticToString(1, -4, 3));       //Действительные корни: x1=1, x2=3
//console.log(solveQuadraticToString(1, 1, 0));        //Действительные корни: x1=-1, x2=0
//console.log(solveQuadraticToString(1, 0, 0));        //Действительные корни совпадают: x1=0, x2=0
//console.log(solveQuadraticToString(1, -8, 16));      //Действительные корни совпадают: x1=4, x2=4

//console.log(solveQuadraticToString(0, 1, 1));        //Уравнение линейно. Корень: x=-1
//console.log(solveQuadraticToString(0, 4, 2));        //Уравнение линейно. Корень: x=-0.5
//console.log(solveQuadraticToString(0, 1, 0));        //Уравнение линейно. Корень: x=0

//Бесконечное кол-во решений
//console.log(solveQuadraticToString(0, 0, 0));        //Бесконечное количество решений, либо дискриминант меньше нуля и уравнение не имеет решений
//console.log(solveQuadraticToString(0, 0, 1));        //Бесконечное количество решений, либо дискриминант меньше нуля и уравнение не имеет решений

//Дискриминант меньше нуля
//console.log(solveQuadraticToString(12, -4, 6));      //Бесконечное количество решений, либо дискриминант меньше нуля и уравнение не имеет решений