import { ResponseStatus } from "@/src/enums/response-status-enum";

export default class ResponseModel {
    constructor() {
        this.status = ResponseStatus.Error;
        this.message = '';
        this.data = null;
    }
}