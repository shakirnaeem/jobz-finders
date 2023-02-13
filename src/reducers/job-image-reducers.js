import { JOB_IMAGE_COMMAND_RESPONSE } from "@/src/constants/job-image-constants";

const jobImageCommandResponseReducer = (state = { success: false, message: '' }, action) => {
    switch (action.type) {
        case JOB_IMAGE_COMMAND_RESPONSE:
            return { ...state, success: action.payload.success, message: action.payload.message };
        default:
            return state;
    }
}

export { 
    jobImageCommandResponseReducer
}