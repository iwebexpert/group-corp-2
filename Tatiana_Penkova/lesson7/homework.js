// Задание №1

function convert(number) {
    if (!Number(number) && number != 0) {
        return console.log(`Вы ввели не число`, {})
    }
    if (String(number).length > 3) {
        return console.log(`Введите число от 0 до 999`, {})
    }

    if (Number(number) < 0) {
        return console.log(`Введите положительное число`, {})
    }

    const numberArr = Array.from(String(number));

    const arr = {
        'единицы': numberArr[numberArr.length - 1],
        'десятки': numberArr[numberArr.length - 2],
        'сотни': numberArr[numberArr.length - 3]
    }

    return arr
}

console.log(convert(0));
console.log(convert('hello'));
console.log(convert('678'));
console.log(convert(70));
console.log(convert(4000));
console.log(convert(-10));

// Задание №2, 3

class Card {
    constructor(user) {
        this.user = user;
        this.totalAmount = [];

    }

    deleteFromCard() {
        let item = +prompt(`Сколько товаров Вы хотите удалить?`, 1);

        for (let i = 0; i < basket.length; i++) {
            if (basket[i].title === this.title) {
                basket[i].count -= item;
                if (basket[i].count <= 0) {
                    basket.splice(i, 1);
                    return console.log(`Товар ${this.title} удален`)
                }

            }
        }

    }

    totalCard() {
        let basketPrice = 0;
        for (let i = 0; i < basket.length; i++) {
            basketPrice += basket[i].price * basket[i].count;
        }
        return basketPrice;
    }

}

class Product extends Card {

    constructor(title, price, currency, category) {
        super();
        this.title = title;
        this.price = price;
        this.currency = currency;
        this.category = category;

    }


    productInfo() {
        return `Имя товара: ${this.title}, Цена: ${this.price} ${this.currency}, Категория: ${this.category}`
    }

    addToCard() {
        let items = +prompt(`Сколько товаров добавить в корзину?`, 1);
        this.count = items;

        basket.push({ 'title': this.title, 'price': this.price, 'count': this.count })

    }




}

class Books extends Product {
    constructor(title, price, currency, category, author, numberOfPages) {
        super(title, price, currency, category);
        this.author = author;
        this.numberOfPages = numberOfPages;

    }

    aboutBook() {
        return `Автор: ${this.author}, Количество страниц: ${this.numberOfPages}`
    }


}

class Movies extends Product {
    constructor(title, price, currency, category, director, starring, year) {
        super(title, price, currency, category);
        this.director = director;
        this.starring = starring;
        this.year = year;
    }

    aboutMovie() {
        return `Режисер: ${this.director}, год выпуска: ${this.year}, в главных ролях: ${this.starring}`
    }

}

let allBasket = new Card('Pavel');

let basket = allBasket.totalAmount;

const book = new Books('War and Peace', 1000, 'RUB', 'Book', 'L. Tolstoy', 1225);
const book2 = new Books('The Idiot', 600, 'RUB', 'Book', 'F. Dostoevsky', 667);
const movie = new Movies('Fight Club', 800, 'RUB', 'Movie', 'David Fincher', ['Edward Norton', 'Brad Pitt', 'Helena Bonham Carter'], 1999);



console.log(book.productInfo());
console.log(movie);


console.log(book.addToCard());
movie.addToCard();
book2.addToCard();

book.deleteFromCard();
book2.deleteFromCard();
console.log(basket);

console.log(book.totalCard());


console.log(book.aboutBook());
console.log(movie.aboutMovie());

