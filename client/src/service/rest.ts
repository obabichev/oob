const domain = '/api';

type Params = { [key in string]: string | number };

const joinParams = (params?: Params) => {
    if (!params) {
        return '';
    }
    return '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
};

const get = async <R>(path: string, params?: Params): Promise<R> => {
    const response = await fetch(domain + path + joinParams(params));

    if (response.status !== 200) {
        throw Error(await response.text());
    }

    return response.json();
};

const post = async <R>(path: string, body: Object): Promise<R> => {
    const response = await fetch(domain + path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw Error(await response.text());
    }

    return response.json();
};

const put = async <R>(path: string, body: Object): Promise<R> => {
    const response = await fetch(domain + path, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw Error(await response.text());
    }

    return response.json();
};

const file = async <R>(path: string): Promise<String> => {
    const response = await fetch(domain + path);

    if (response.status !== 200) {
        throw Error(await response.text());
    }

    return response.text();
};

const upload = async (path: string, file: any): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(domain + path, {
        method: 'POST',
        body: formData
    });

    return response.json();
};

export const service = {
    get,
    post,
    file,
    upload,
    put
};
