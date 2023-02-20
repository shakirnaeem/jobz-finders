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

    if (response.data && response.data.length) {
        response.data.forEach(item => {
            if (item.parent != '') {
                var itemParent = response.data.filter(x => x._id == item.parent);
                if (itemParent.length > 0) {
                    item.parent = itemParent[0].keyword;
                }
                else {
                    item.parent = 'None';
                }
            }
            else {
                item.parent = 'None';
            }
        });
    }

    dispatch({
        type: GET_ALL_KEYWORDS,
        payload: response
    });
}

const getKeywordsTreeAction = () => async (dispatch, getState) => {
    var queryModel = new JobKeywordRequestModel();
    var request = new RequestModel();
    request.pageNo = 0;
    request.pageSize = 0;
    request.queryModel = {};
    request.responseType = '';

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);

    var keywordList = []
    if (response.data && response.data.length) {
        var parentKeywords = response.data.filter(x => x.parent == '')
        parentKeywords.forEach(item => {
            keywordList.push({ _id: item._id, keyword: item.keyword, parent: item.parent, active: item.active })
            var childKeywords = response.data.filter(x => x.parent == item._id)
            childKeywords.forEach(child => {
                keywordList.push({ _id: child._id, keyword: child.keyword, parent: item.keyword, active: child.active })
            });
        });
    }

    response.data = keywordList

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
        payload: response
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