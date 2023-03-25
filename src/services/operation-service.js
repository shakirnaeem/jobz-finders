import { LOADER_VISIBLE } from "../constants/common-constants";
import RequestModel from "../models/request-model";
import ApiService from "./api-service";
import CommonService from "./common-service";

class OperationService {
    _dispatch = null;
    _serviceName = null;
    constructor(dispatch, serviceName) {
        this._dispatch = dispatch;
        this._serviceName = serviceName;
    }

    async getList(queryModel = null, responseType = '') {
        return await this.getPagedList(queryModel, responseType);
    }

    async getPagedList(queryModel = null, responseType = '', pageNo = 0) {
        var request = new RequestModel();
        request.pageNo = pageNo;
        request.queryModel = queryModel ? queryModel : {};
        request.responseType = responseType;

        var queryParam = CommonService.toQueryString(request);

        this._dispatch({ type: LOADER_VISIBLE, payload: true });
        var response = await ApiService.get(`${this._serviceName}?${queryParam}`);
        this._dispatch({ type: LOADER_VISIBLE, payload: false });

        return response;
    }

    async getDetail(id, responseType = '') {
        var request = new RequestModel();
        request.queryModel = { _id: id };
        request.responseType = responseType;

        var queryParam = CommonService.toQueryString(request);

        this._dispatch({ type: LOADER_VISIBLE, payload: true });
        var response = await ApiService.get(`${this._serviceName}?${queryParam}`);
        this._dispatch({ type: LOADER_VISIBLE, payload: false });

        return response;
    }

    async add(model) {
        this._dispatch({ type: LOADER_VISIBLE, payload: true });
        var response = await ApiService.add(this._serviceName, model);
        this._dispatch({ type: LOADER_VISIBLE, payload: false });
        return response;
    }
    
    async update(model) {
        this._dispatch({ type: LOADER_VISIBLE, payload: true });
        var response = await ApiService.update(this._serviceName, model);
        this._dispatch({ type: LOADER_VISIBLE, payload: false });
        return response;
    }
    
    async delete(model) {
        this._dispatch({ type: LOADER_VISIBLE, payload: true });
        var response = await ApiService.delete(`${this._serviceName}?_id=${model._id}`, model);
        this._dispatch({ type: LOADER_VISIBLE, payload: false });
        return response;
    }
}

export default OperationService
