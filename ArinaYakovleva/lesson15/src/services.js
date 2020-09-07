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

const fetchData = async () => {
    try {
        const response = await fetch(`http://localhost:3000/sales`);
        const result = response.json();
        return result;
    } catch {
        console.error('Error');
    }
};

const getData = async () => {
    const data = await fetchData();
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