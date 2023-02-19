export default class CommonService {
    constructor() { }

    static toDateString(dateModel) {
        const dateOptions = {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
        if (!dateModel instanceof Date) {
            dateModel = new Date();
        }
        return new Intl.DateTimeFormat('en-US', dateOptions).format(dateModel)
    }

    static toQueryString(obj, parent = '') {
        var queryString = Object.keys(obj).map(key => {
            if (typeof obj[key] === 'object' && obj[key] != null) {
                return `${this.toQueryString(obj[key], `${key}.`)}`;
            }
            else {
                return `${parent}${key}=${obj[`${key}`]}`;
            }
        }).join('&');
        return queryString;
    }

    static queryStringToJSON(queryString) {
        queryString = queryString.split('?')[1];
        var pairs = queryString.split('&');

        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            pair[1] = pair[1] == 'null' ? null : pair[1];
            if (pair[0].indexOf('.') > -1) {
                var pairObj = pair[0].split('.');
                if (!result[pairObj[0]])
                    result[pairObj[0]] = { [pairObj[1]]: pair[1] };
                else
                    result[pairObj[0]][pairObj[1]] = pair[1];
            }
            else {
                result[pair[0]] = pair[1];
            }
        });

        return JSON.parse(JSON.stringify(result));
    }

    static applyContains(queryModel) {
        Object.keys(queryModel).forEach(function(key) {
            queryModel[key] = { '$regex' : queryModel[key], '$options' : 'i' };
        });

        return queryModel;
    }

    static encodeParams(string) {
        string = 'bbvgjj6' + string + 'bbvgjj677*hhbvYYYHNNMB';
        let number = '0';
        let length = string.length;
        for (let i = 0; i < length; i++) {
            number += string.charCodeAt(i).toString(16);
        }
        return number;
    }
    static decodeParams(number) {
        let string = '';
        number = number.slice(1);
        let length = number.length;
        for (let i = 0; i < length;) {
            let code = number.slice(i, i += 2);
            string += String.fromCharCode(parseInt(code, 16));
        }
        if (string.includes('bbvgjj6') && string.includes('bbvgjj677*hhbvYYYHNNMB')) {
            return string.replace('bbvgjj6', '').replace('bbvgjj677*hhbvYYYHNNMB', '');
        } else {
            window.location.href = '/error';
        }
    }

    static groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
}