const root = document.getElementById('root');
const cardMain = document.getElementById('cardChoose');
const order = document.getElementById('orderParams');
const cost = document.getElementById('cost');
class Size {
    constructor() {
        this.content = {
            small: true,
            big: false
        }
        this.type = 'radio'
        this.name = 'size'
    }
    setSize(name) {
        for (let key in this.content) {
            this.content[key] = false
            if (this.content[name] === this.content[key])
                this.content[name] = true;

        }
    }
    getSize() {
        return this.content.small ? 'small' : 'big';
    }
}
class Topping {
    constructor() {
        this.content = {
            cheese: false,
            salad: false,
            potato: false
        }
        this.type = 'checkbox'
        this.name = 'topping'
    }
    setTopping(name, value) {
        this.content[name] = value;
    }
    getTopping() {
        let toppingArr = [];
        for (let key in this.content) {
            if (this.content[key] === true)
                toppingArr.push(key);
        }
        return toppingArr;
    }
}
class Stuffing {
    constructor() {
        this.content = {
            spice: false,
            mayonnaise: false
        }
        this.type = 'checkbox'
        this.name = 'stuffing'
    }
    setStuffig(name, value) {
        this.content[name] = value;
    }
    getStuffing() {
        let stuffingArr = [];
        for (let key in this.content) {
            if (this.content[key] === true)
                stuffingArr.push(key);
        }
        return stuffingArr;
    }
}

class Hamburger {
    constructor() {
        this.size = new Size()
        this.topping = new Topping()
        this.stuffing = new Stuffing()
        this.cost = {
            small: 50,
            big: 100,
            cheese: 10,
            salad: 20,
            potato: 15,
            spice: 15,
            mayonnaise: 20
        }
        this.calories = {
            small: 20,
            big: 40,
            cheese: 20,
            salad: 5,
            potato: 10,
            spice: 0,
            mayonnaise: 5
        }
    }
    countSome(what) {
        let sum = +what[this.size.getSize()];
        this.topping.getTopping().map(item => {
            sum += +what[item];
        });
        this.stuffing.getStuffing().map(item => {
            sum += +what[item];
        });
        return sum;
    }
    renderCost() {
        cost.innerHTML = '';
        cost.insertAdjacentHTML('afterbegin', `<h4>Общая стоимость: ${this.countSome(this.cost)} руб.</h4><h4>Количество каллорий: ${this.countSome(this.calories)}</h4>`);
    }
    submit(event) {
        event.preventDefault();
        const modal = document.getElementById('modal');
        modal.classList.toggle('hide');
    }
    createModal() {
        const modalbtn = document.getElementById('btnModal');
        modalbtn.addEventListener('click', this.submit);
        const content = document.querySelector('.modalContent');
        content.innerHTML= '';
        content.insertAdjacentHTML('afterbegin', `<p class='ordered'>Ваш заказ на сумму ${this.countSome(this.cost)} руб. принят</p>`);
    }
    render() {
        let createInput = (name, type, labels, callback) => {
            const div = document.createElement('div');
            div.classList.add('inputItem');
            div.insertAdjacentHTML('afterbegin', `<h2>${name.toUpperCase(0)}</h2>`);
            div.addEventListener('click', (event) => {
                if (event.target.id) {
                    callback(event.target.id, event.target.checked);
                    this.renderCost();
                    this.createModal();
                }
            });

            for (let key in labels) {
                const label = document.createElement('label');
                label.textContent = key;
                const input = document.createElement('input');
                input.checked = labels[key];
                input.name = name;
                input.id = key;
                input.type = type;
                div.append(input);
                div.append(label);
                div.insertAdjacentHTML('beforeend', '<br>');
            };
            order.append(div);
        }
        createInput(this.size.name, this.size.type, this.size.content, this.size.setSize.bind(this.size));
        createInput(this.topping.name, this.topping.type, this.topping.content, this.topping.setTopping.bind(this.topping));
        createInput(this.stuffing.name, this.stuffing.type, this.stuffing.content, this.stuffing.setStuffig.bind(this.stuffing));
        order.insertAdjacentHTML('beforeend', '<button type="submit" class="btnSubmit">Заказать</button>');
        const btnSubmit = document.querySelector('.btnSubmit');
        btnSubmit.addEventListener('click', this.submit);
    }

}
const myHamb = new Hamburger();
myHamb.render();
