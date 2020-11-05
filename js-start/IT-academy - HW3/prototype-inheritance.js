//Заметка

function Note() {
    this.title;
    this.text;
}
Note.prototype.show = function() {
    console.log('\n> ' + this.title + '\n> ' + this.text);
}

//Напоминание

function Memo() {
    Note.apply(this, arguments);
    this.datetime;
}
Memo.prototype = Object.create(Note.prototype);
Memo.prototype.constructor = Memo;
Memo.prototype.check = function() {
    if (this.datetime / 1000 === parseInt(Date.now() / 1000)) {
        this.show();
        console.log('Показано в: ' + (new Date(this.datetime)).toString());
    }
}

//Напоминание с интервалом

function ScheduledMemo() {
    Memo.apply(this, arguments);
    this.interval;
}
ScheduledMemo.prototype = Object.create(Memo.prototype);
ScheduledMemo.prototype.constructor = ScheduledMemo;
ScheduledMemo.prototype.check = function() {
    Memo.prototype.check.apply(this, arguments);
    if (this.datetime / 1000 === parseInt(Date.now() / 1000)) {
        this.datetime += this.interval;
        console.log('Будет показано снова через: ' + this.interval / 1000 + ' секунд');
    }
}

//===============================================================

let memo = new Memo();
memo.title = "Напоминание";
memo.text = "Текст напоминания";
memo.datetime = Date.parse('2018-11-27 17:58:10');

let sm = new ScheduledMemo();
sm.title = "Напоминание с интервалом";
sm.text = "Текст напоминания с интервалом";
sm.datetime = Date.parse('2018-11-27 17:58:15');
sm.interval = 7000;

setInterval(() => { memo.check(), sm.check() }, 1000);