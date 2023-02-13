export default class RequestModel {
    constructor() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.sortProperty = '';
        this.sortOrder = 1;
        this.queryModel = null;
        this.responseType = null;
    }
}