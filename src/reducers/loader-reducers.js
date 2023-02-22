import { LOADER_VISIBLE } from "@/src/constants/common-constants";

const loaderVisiblReducer = (state = { flag: false }, action) => {
    switch (action.type) {
        case LOADER_VISIBLE:
            return { ...state, flag: action.payload };
        default:
            return state;
    }
}

export { 
    loaderVisiblReducer
}