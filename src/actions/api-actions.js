import ApiService from "@/src/services/api-service";
import { LOADER_VISIBLE } from "../constants/common-constants";

const queryAction = async (dispatch, url) => {
    dispatch({ type: LOADER_VISIBLE, payload: true });
    var response = await ApiService.get(url);
    dispatch({ type: LOADER_VISIBLE, payload: false });
    return response;
}

const addCommandAction = async (dispatch, url, model) => {
    dispatch({ type: LOADER_VISIBLE, payload: true });
    var response = await ApiService.add(url, model);
    dispatch({ type: LOADER_VISIBLE, payload: false });
}

const updateCommandAction = async (dispatch, url, model) => {
    dispatch({ type: LOADER_VISIBLE, payload: true });
    var response = await ApiService.update(url, model);
    dispatch({ type: LOADER_VISIBLE, payload: false });
}

const deleteCommandAction = async (dispatch, url, model) => {
    dispatch({ type: LOADER_VISIBLE, payload: true });
    var response = await ApiService.delete(url, model);
    dispatch({ type: LOADER_VISIBLE, payload: false });
}

export {
    queryAction,
    addCommandAction,
    updateCommandAction,
    deleteCommandAction
}