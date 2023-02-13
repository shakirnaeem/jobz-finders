import ApiService from "@/src/services/api-service";
import { JOB_IMAGE_COMMAND_RESPONSE } from "@/src/constants/job-image-constants";

const addJobImageAction = (model) => async (dispatch, getState) => {
    var finalResponse = await uploadFile(model);
    dispatch({
        type: JOB_IMAGE_COMMAND_RESPONSE,
        payload: finalResponse
    });
}

const updateJobImageAction = (model) => async (dispatch, getState) => {
    var response = await ApiService.get(`job-images/remove-file?file=${model.existingFile}`);
    var finalResponse = await uploadFile(model);
    dispatch({
        type: JOB_IMAGE_COMMAND_RESPONSE,
        payload: finalResponse
    });
}

const uploadFile = async (model) => {
    var response = await ApiService.get(`job-images/upload-url?file=${model.fileName}`);
    const { url, fields } = await response.data;
    const formData = new FormData();
    const file = model.imageFile;

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
    });
    const upload = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    var finalResponse = null;
    if (upload.ok) {
        finalResponse = { success: true, message: 'File uploaded successfully.' }
    } else {
        finalResponse = { success: true, message: 'File upload failed.' }
    }
    return finalResponse;
}

export {
    addJobImageAction,
    updateJobImageAction
}