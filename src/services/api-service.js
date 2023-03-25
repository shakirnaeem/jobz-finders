const { API_URI } = process.env

class ApiService {

    static getHeaders() {
        const token = localStorage.getItem('_token');
        const simpleHeaders = {
            'Content-Type': 'application/json'
        };

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        return token == null ? simpleHeaders : authHeaders;
    }

    static handleError(response) {
        if (response.status == 401) {
            window.location.href = '/login';
        }
    }

    static async sendCommandRequest(url, data, httpMethod, baseUri) {
        try {
            let basePath = baseUri ? baseUri : process.env.API_URI;
            var options = {
                headers: this.getHeaders(),
                method: httpMethod
            };
            if (httpMethod != 'DELETE') {
                options['body'] = JSON.stringify(data)
            }
            const api_url = `${basePath}${url}`
            const res = await fetch(api_url, options)
            return await res.json()
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    static async add(url, data, baseUri) {
        return await ApiService.sendCommandRequest(url, data, 'POST', baseUri);
    }

    static async update(url, data, baseUri) {
        return await ApiService.sendCommandRequest(url, data, 'PUT', baseUri);
    }

    static async delete(url, data, baseUri) {
        return await ApiService.sendCommandRequest(url, data, 'DELETE', baseUri);
    }

    static async get(url, baseUri) {
        try {
            let basePath = baseUri ? baseUri : process.env.API_URI;
            const api_url = `${basePath}${url}`
            const res = await fetch(api_url,
                {
                    headers: this.getHeaders(),
                    method: 'GET'
                }
            )
            const response = await res.json();
            return response;
        } catch (error) {
            console.log(`error: ${error}`)
        }
        // return await sendQueryRequest(url);
    }
}

export default ApiService
