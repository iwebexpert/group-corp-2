const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                }

                const goods = JSON.parse(xhr.responseText);
                resolve(goods);
            }
        }
        xhr.send();
    });
}

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch {
        console.error('Error');
    }
}


const getData = async (url) => {
    const data = await fetchData(url);
    if (data) {
        const sales = [],
            months = [],
            arr = [];

        data.forEach((sale) => {
            sales.push(sale.sales);
            months.push(sale.month);
        });
        const totalSum = sales.reduce((a, b) => a + b, 0);

        sales.forEach(sale => {
            arr.push(sale / totalSum);
        });
        return { sales, months, arr }
    }
};

const postItemToBasket = async (obj) => {
    const data = await fetch('http://localhost:3000/basket/', {
        method: 'POST',
        body: JSON.stringify({ 'id': obj.name, ...obj }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    console.log(data);
}

const patchQuantity = async (name, quantity) => {
    const data = await fetch(`http://localhost:3000/basket/${name}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: quantity }),
        headers: {
            'Content-type': 'application/json',
        },
    });

    console.log(data);
}

const deleteItemFromBasket = async (name) => {
    const data = await fetch(`http://localhost:3000/basket/${name}`, {
        method: 'DELETE',
    });

    console.log(data);
}

const getBasketData = async () => {
    const data = await fetchData('http://localhost:3000/basket');
    const items = [],
        prices = [],
        currency = 'RUB',
        quantities = [];

    data.forEach(item => {
        items.push(item.name);
        prices.push(item.price);
        quantities.push(item.quantity);
    });

    shop({
        items,
        prices,
        currency,
        quantities
    });

}