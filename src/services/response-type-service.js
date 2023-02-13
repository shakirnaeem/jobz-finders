import { PARENT_KEYWORDS, JOB_LIST } from "@/src/constants/response-type-constants"
import ParentKeywordResponseModel from "@/src/response-models/parent-keywords-response-model"
import JobListResponseModel from "@/src/response-models/job-list-response-model"

const { API_URI } = process.env

class ResponseTypeService {

    static getResponseTypeModel(type) {
        switch (type) {
            case PARENT_KEYWORDS:
                return new ParentKeywordResponseModel();
            case JOB_LIST:
                return new JobListResponseModel();
            default:
                return {};
        }
    }
}

export default ResponseTypeService
