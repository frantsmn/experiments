//Заметка

class Note {
    constructor() {
        this.title;
        this.text;
    }
    show() {
        console.log('\n> ' + this.title + '\n> ' + this.text);
    }
}

//Напоминание

class Memo extends Note {
    constructor() {
        super();
        this.datetime
    }
    check() {
        if (this.datetime / 1000 === parseInt(Date.now() / 1000)) {
            this.show();
            console.log('Показано в: ' + (new Date(this.datetime)).toString());
        }
    }
}

//Напоминание с интервалом

class ScheduledMemo extends Memo {
    constructor() {
        super();
        this.interval;
    }
    check() {
        super.check();
        if (this.datetime / 1000 === parseInt(Date.now() / 1000)) {
            this.datetime += this.interval;
            console.log('Будет показано снова через: ' + this.interval / 1000 + ' секунд');
        }
    }
}

//===============================================================

let memo = new Memo();
memo.title = "Напоминание";
memo.text = "Текст напоминания";
memo.datetime = Date.parse('2018-11-27 18:17:05');

let sm = new ScheduledMemo();
sm.title = "Напоминание с интервалом";
sm.text = "Текст напоминания с интервалом";
sm.datetime = Date.parse('2018-11-27 18:17:10');
sm.interval = 7000;

setInterval(() => {
    memo.check(), sm.check()
}, 1000);