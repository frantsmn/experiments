//Заметка

function Note() {
    this.title;
    this.text;
    this.show = () => {
        console.log('\n> ' + this.title + '\n> ' + this.text);
    }
}

//Напоминание

function Memo() {
    Note.apply(this, arguments);
    this.datetime;
    this.check = () => {
        if (this.datetime / 1000 === parseInt(Date.now() / 1000)) {
            this.show();
            console.log('Показано в: ' + (new Date(this.datetime)).toString());
        }
    }
}

//Напоминание с интервалом

function ScheduledMemo() {
    Memo.apply(this, arguments);
    this.interval;
    let parentCheck = this.check;
    this.check = () => {
        parentCheck.call(this);
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
memo.datetime = Date.parse('2018-11-25 17:51:20');

let sm = new ScheduledMemo();
sm.title = "Напоминание с интервалом";
sm.text = "Текст напоминания с интервалом";
sm.datetime = Date.parse('2018-11-25 17:50:55');
sm.interval = 7000;

setInterval(() => { memo.check(), sm.check() }, 600);