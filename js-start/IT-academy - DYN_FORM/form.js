let formDef1 = [{
        label: 'Название сайта',
        kind: 'longtext',
        name: 'sitename'
    },
    {
        label: 'URL сайта',
        kind: 'longtext',
        name: 'siteurl'
    },
    {
        label: 'Посетителей в сутки',
        kind: 'number',
        name: 'visitors'
    },
    {
        label: 'E-mail для связи',
        kind: 'shorttext',
        name: 'email'
    },
    {
        label: 'Рубрика каталога',
        kind: 'combo',
        name: 'division',
        variants: [{
            text: 'здоровье',
            value: 1
        }, {
            text: 'домашний уют',
            value: 2
        }, {
            text: 'бытовая техника',
            value: 3
        }]
    },
    {
        label: 'Размещение',
        kind: 'radio',
        name: 'payment',
        variants: [{
            text: 'бесплатное',
            value: 1
        }, {
            text: 'платное',
            value: 2
        }, {
            text: 'VIP',
            value: 3
        }]
    },
    {
        label: 'Разрешить отзывы',
        kind: 'check',
        name: 'votes'
    },
    {
        label: 'Описание сайта',
        kind: 'memo',
        name: 'description'
    },
    {
        label: 'Опубликовать',
        kind: 'submit'
    }
]

let formDef2 = [{
        label: 'Фамилия',
        kind: 'longtext',
        name: 'lastname'
    },
    {
        label: 'Имя',
        kind: 'longtext',
        name: 'firstname'
    },
    {
        label: 'Отчество',
        kind: 'longtext',
        name: 'secondmane'
    },
    {
        label: 'Возраст',
        kind: 'number',
        name: 'age'
    },
    {
        label: 'Зарегестрироваться',
        kind: 'submit'
    }
]

let formCreater = (() => {

    let createTextOrNumber = (element) => {
        let div = document.createElement('div');
        let label = document.createElement('label');
        let input = document.createElement('input');
        label.textContent = element.label + ':';
        label.setAttribute('for', element.name);
        input.setAttribute('name', element.name);
        input.setAttribute('type', element.kind === 'number' ? 'number' : 'text');
        input.setAttribute('id', element.name);
        input.classList.add(element.kind);
        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    let elementVoc = {
        longtext: (element) => {
            return createTextOrNumber(element)
        },
        shorttext: (element) => {
            return createTextOrNumber(element)
        },
        number: (element) => {
            return createTextOrNumber(element)
        },
        combo: (element) => {
            let div = document.createElement('div');
            let label = document.createElement('label');
            let select = document.createElement('select');
            label.textContent = element.label + ':';
            label.setAttribute('for', element.name);
            select.setAttribute('name', element.name);
            select.setAttribute('id', element.name);
            element.variants.forEach(element => {
                let option = document.createElement('option');
                option.textContent = element.text;
                option.setAttribute('value', element.value);
                select.appendChild(option);
            });
            div.appendChild(label);
            div.appendChild(select);
            return div;
        },
        radio: (element) => {
            let div = document.createElement('div');
            let container = document.createElement('div');
            let label = document.createElement('label');
            label.textContent = element.label + ':';
            element.variants.forEach((el, i) => {
                let radio = document.createElement('input');
                radio.setAttribute('name', element.name)
                radio.setAttribute('type', 'radio');
                radio.setAttribute('id', element.name + i);
                radio.setAttribute('value', el.value);
                container.appendChild(radio);
                let label = document.createElement('label');
                label.setAttribute('for', element.name + i);
                label.textContent = el.text;
                container.appendChild(label);
            });
            div.appendChild(label);
            div.appendChild(container);
            return div;
        },
        check: (element) => {
            let div = document.createElement('div');
            let label = document.createElement('label');
            let input = document.createElement('input');
            label.textContent = element.label + ':';
            input.setAttribute('name', element.name);
            input.setAttribute('type', 'checkbox');
            div.appendChild(label);
            div.appendChild(input);
            return div;
        },
        memo: (element) => {
            let div = document.createElement('div');
            let textarea = document.createElement('textarea');
            let label = document.createElement('label');
            label.textContent = element.label + ':';
            label.setAttribute('for', element.name);
            textarea.setAttribute('name', element.name);
            textarea.setAttribute('id', element.name);
            div.appendChild(label);
            div.appendChild(textarea);
            return div;
        },
        submit: (element) => {
            let div = document.createElement('div');
            let button = document.createElement('button');
            button.setAttribute('type', 'submit');
            button.textContent = element.label;
            div.appendChild(button);
            return div;
        }
    }

    return {
        create: (array, form) => {
            array.forEach(element => {
                form.appendChild(elementVoc[element.kind](element));
            });
        }
    }

})();

formCreater.create(formDef1, document.getElementById('form1'));
formCreater.create(formDef2, document.getElementById('form2'));