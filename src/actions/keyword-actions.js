import ApiService from "@/src/services/api-service";
import JobKeywordModel from "@/src/models/job-keyword-model";
import CommonService from "@/src/services/common-service";
import JobKeywordRequestModel from "@/src/request-models/job-keyword-request-model";
import RequestModel from "@/src/models/request-model";
import { ADD_KEYWORD, GET_ALL_KEYWORDS, GET_KEYWORDS_TREE, GET_KEYWORD_DETAILS, GET_PARENT_KEYWORDS, KEYWORD_COMMAND_RESPONSE } from "@/src/constants/keyword-constants";
import { PARENT_KEYWORDS } from "@/src/constants/response-type-constants";
import ResponseModel from "@/src/models/response-model";

const ApiName = 'keywords';

const getParentKeywordsAction = () => async (dispatch, getState) => {
    var queryModel = new JobKeywordRequestModel();
    queryModel.parent = '';
    var request = new RequestModel();
    request.queryModel = queryModel;
    request.responseType = PARENT_KEYWORDS;

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);

    dispatch({
        type: GET_PARENT_KEYWORDS,
        payload: response.data
    });
}

const getAllKeywordsAction = (pageNo = 1, queryModel = null) => async (dispatch, getState) => {
    var request = new RequestModel();
    request.pageNo = pageNo;
    request.queryModel = queryModel ? queryModel : {};
    request.responseType = '';

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);

    dispatch({
        type: GET_ALL_KEYWORDS,
        payload: response
    });
}

const getKeywordsTreeAction = () => async (dispatch, getState) => {
    var request = new RequestModel();
    request.pageNo = 0;
    request.pageSize = 0;

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);

    dispatch({
        type: GET_ALL_KEYWORDS,
        payload: response
    });
}

const getKeywordDetailsAction = (id) => async (dispatch, getState) =>  {
    var queryModel = new JobKeywordRequestModel();
    var request = new RequestModel();
    request.queryModel = { _id: id };
    request.responseType = '';

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);
    var result = response.data.length > 0 ? response.data[0] : new JobKeywordModel()

    dispatch({
        type: GET_KEYWORD_DETAILS,
        payload: result
    });
}

const addKeywordAction = (model) => async (dispatch, getState) => {
    var response = await ApiService.add(`${ApiName}`, model);

    dispatch({
        type: KEYWORD_COMMAND_RESPONSE,
        payload: response
    });
}

const updateKeywordAction = (model) => async (dispatch, getState) => {
    var response = await ApiService.update(`${ApiName}`, model);

    dispatch({
        type: KEYWORD_COMMAND_RESPONSE,
        payload: response
    });
}

const deleteKeywordAction = (entity) => async (dispatch, getState) => {
    var response = await ApiService.delete(`${ApiName}/${entity._id}`);

    if (response && response.success) {
        dispatch(getAllKeywordsAction());
    }
    else {
        dispatch({
            type: KEYWORD_COMMAND_RESPONSE,
            payload: response
        });
    }
}

const clearKeywordResponseAction = (success = false, message = '') => async (dispatch, getState) => {
    dispatch({
        type: KEYWORD_COMMAND_RESPONSE,
        payload: { success: success, message: message }
    });
}

export {
    getParentKeywordsAction,
    addKeywordAction,
    updateKeywordAction,
    deleteKeywordAction,
    clearKeywordResponseAction,
    getAllKeywordsAction,
    getKeywordDetailsAction,
    getKeywordsTreeAction
}