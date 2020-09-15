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

const getData = async (url) => {
    try {
        const rawResponse = await fetch(`${API_URL}/${url}`);
        const response = rawResponse.json();
        return response;
    } catch {
        return false;
    }
};

const sendData = async (url, method, data) => {
    try {
        let options = { method: `${method}`, body: `${JSON.stringify(data)}`,  headers: {
            'Content-Type': 'application/json'
            }};
        if (method === 'DELETE') options = { method: `${method}`};
        const rawResponse = await fetch(`${API_URL}/${url}`, options);
        const response = rawResponse.json();
        return response;
    } catch {
        return false;
    }
};

export { getData, makeGETRequest, sendData };