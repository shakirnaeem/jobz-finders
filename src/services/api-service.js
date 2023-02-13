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

    static async sendCommandRequest(url, data, httpMethod) {
        try {
            var options = {
                headers: this.getHeaders(),
                method: httpMethod
            };
            if (httpMethod != 'DELETE') {
                options['body'] = JSON.stringify(data)
            }
            const api_url = `${API_URI}${url}`
            const res = await fetch(api_url, options)
            return await res.json()
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
    
    static async sendDeleteCommandRequest(url, httpMethod) {
        try {
            var options = {
                headers: this.getHeaders(),
                method: httpMethod
            };
            
            const api_url = `${API_URI}${url}`
            const res = await fetch(api_url, options)
            return await res.json()
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    static async sendQueryRequest(url) {
        try {
            const api_url = `${API_URI}${url}`
            const res = await fetch(api_url,
                {
                    headers: this.getHeaders(),
                    method: 'GET'
                }
            )
            return await res.json()
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }

    static async add(url, data) {
        return await ApiService.sendCommandRequest(url, data, 'POST');
    }

    static async update(url, data) {
        return await ApiService.sendCommandRequest(url, data, 'PUT');
    }

    static async delete(url, data) {
        return await ApiService.sendCommandRequest(url, data, 'DELETE');
    }

    static async get(url) {
        try {
            const api_url = `${API_URI}${url}`
            const res = await fetch(api_url,
                {
                    headers: this.getHeaders(),
                    method: 'GET'
                }
            )
            return await res.json()
        } catch (error) {
            console.log(`error: ${error}`)
        }
        // return await sendQueryRequest(url);
    }
}

export default ApiService
