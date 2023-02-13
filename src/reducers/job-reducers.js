import { GET_ALL_JOBS, JOB_COMMAND_RESPONSE, GET_JOB_DETAILS } from "@/src/constants/job-constants";
import JobModel from "@/src/models/job-model";

const getAllJobsReducer = (state = { data: [], success: false }, action) => {
    switch (action.type) {
        case GET_ALL_JOBS:
            return { ...state, data: action.payload.data, success: action.payload.success };
        default:
            return state;
    }
}

const getJobDetailReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case GET_JOB_DETAILS:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

const jobCommandResponseReducer = (state = { success: false, message: '' }, action) => {
    switch (action.type) {
        case JOB_COMMAND_RESPONSE:
            return { ...state, success: action.payload.success, message: action.payload.message };
        default:
            return state;
    }
}

export { 
    getAllJobsReducer,
    jobCommandResponseReducer,
    getJobDetailReducer
}