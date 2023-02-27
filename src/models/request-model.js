export default class RequestModel {
    constructor() {
        this.pageNo = 1;
        this.pageSize = 20;
        this.sortProperty = '';
        this.sortOrder = 1;
        this.queryModel = {};
        this.responseType = '';
    }
}