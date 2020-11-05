function fillMatrix(n, m) {
    let matrix = [];
    const max = Math.max(m, n);
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < m; j++) {
            matrix[i][j] = j === i || j === max - i - 1 ? '■' : ' ';
        }
    }
    return matrix;
}
console.log(fillMatrix(9, 6));

//console.log(fillMatrix(6, 9));
//console.log(fillMatrix(9, 9));
// console.log(fillMatrix(1, 1));
// console.log(fillMatrix(0, 0));