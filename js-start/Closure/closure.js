let counter = (() => {
    let a = 0;
    return (num) => {
        a = num === undefined ? ++a : num;
        console.log(a);
    }
})();

counter();
counter();
counter(10);
counter();
counter();