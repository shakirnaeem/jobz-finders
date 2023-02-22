import ApiService from "@/src/services/api-service";
import JobModel from "@/src/models/job-model";
import CommonService from "@/src/services/common-service";
import RequestModel from "@/src/models/request-model";
import { GET_ALL_JOBS, GET_JOB_DETAILS, JOB_COMMAND_RESPONSE } from "@/src/constants/job-constants";
import ResponseModel from "@/src/models/response-model";
import { JOB_LIST } from "@/src/constants/response-type-constants";
import { LOADER_VISIBLE } from "../constants/common-constants";

const ApiName = 'jobs';

const getAllJobsAction = (pageNo = 1, queryModel = null) => async (dispatch, getState) => {
    var request = new RequestModel();
    request.pageNo = pageNo;
    request.queryModel = queryModel ? queryModel : {};
    request.responseType = JOB_LIST;
    dispatch({ type: LOADER_VISIBLE, payload: true });
    
    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);
    dispatch({ type: LOADER_VISIBLE, payload: false });
    dispatch({
        type: GET_ALL_JOBS,
        payload: response
    });
}

const getJobDetailsAction = (id) => async (dispatch, getState) => {
    var request = new RequestModel();
    request.queryModel = { _id: id };
    request.responseType = '';

    var queryParam = CommonService.toQueryString(request);
    var response = await ApiService.get(`${ApiName}?${queryParam}`);
    
    var result = response.data.length > 0 ? response.data[0] : new JobModel()
    dispatch({
        type: GET_JOB_DETAILS,
        payload: result
    });
}

const addJobAction = (model) => async (dispatch, getState) => {
    var response = await ApiService.add(`${ApiName}`, model);

    dispatch({
        type: JOB_COMMAND_RESPONSE,
        payload: response
    });
}

const updateJobAction = (model) => async (dispatch, getState) => {
    var response = await ApiService.update(`${ApiName}`, model);

    dispatch({
        type: JOB_COMMAND_RESPONSE,
        payload: response
    });
}

const deleteJobAction = (entity) => async (dispatch, getState) => {
    var response = await ApiService.delete(`${ApiName}`, entity);

    dispatch({
        type: JOB_COMMAND_RESPONSE,
        payload: response
    });
}

const clearJobResponseAction = (success = false, message = '') => async (dispatch, getState) => {
    dispatch({
        type: JOB_COMMAND_RESPONSE,
        payload: { success: success, message: message }
    });
}

export { 
    addJobAction, 
    updateJobAction, 
    deleteJobAction , 
    clearJobResponseAction, 
    getAllJobsAction, 
    getJobDetailsAction
}