import { ADD_KEYWORD, GET_ALL_KEYWORDS, GET_KEYWORD_DETAILS, GET_PARENT_KEYWORDS, KEYWORD_COMMAND_RESPONSE } from "@/src/constants/keyword-constants";
import JobKeywordModel from "@/src/models/job-keyword-model";

const getParentKeywordsReducer = (state = { parentKeywords: [] }, action) => {
    switch (action.type) {
        case GET_PARENT_KEYWORDS:
            return { ...state, parentKeywords: action.payload };
        default:
            return state;
    }
}
const getAllKeywordsReducer = (state = { data: [], success: false, count:0 }, action) => {
    switch (action.type) {
        case GET_ALL_KEYWORDS:
            return { ...state, data: action.payload.data, count: action.payload.count, success: action.payload.success };
        default:
            return state;
    }
}

const getKeywordDetailReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case GET_KEYWORD_DETAILS:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

const keywordCommandResponseReducer = (state = { success: false, message: '' }, action) => {
    switch (action.type) {
        case KEYWORD_COMMAND_RESPONSE:
            return { ...state, success: action.payload.success, message: action.payload.message };
        default:
            return state;
    }
}

export { 
    getParentKeywordsReducer, 
    getAllKeywordsReducer,
    keywordCommandResponseReducer,
    getKeywordDetailReducer
}