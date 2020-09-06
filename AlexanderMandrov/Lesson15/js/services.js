const API_URL = '';

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status != 200) {
                    reject(`${xhr.status}: ${xhr.statusText}`);
                }
                resolve(JSON.parse(xhr.responseText));
            }
        }

        xhr.open('GET', `${API_URL}/${url}`, true);
        xhr.send();
    });
};

const getSalesData = async () => {
    try {
        const rawResponse = await fetch(`${API_URL}/sales`);
        const response = rawResponse.json();
        return response;
    } catch {
        return false;
    }
};

export { getSalesData, makeGETRequest };