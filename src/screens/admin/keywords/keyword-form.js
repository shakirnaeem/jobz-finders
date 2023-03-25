import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { useRouter } from "next/router";
import JobKeywordModel from "@/src/models/job-keyword-model";
import OperationService from "@/src/services/operation-service";
import { PARENT_KEYWORDS } from "@/src/constants/response-type-constants";
import CommonService from "@/src/services/common-service";
import ObjectID from "bson-objectid";
import { ToastContainer, toast } from 'react-toastify'

const KeywordForm = (props) => {
    var router = useRouter();
    const dispatch = useDispatch();
    const service = new OperationService(dispatch, 'keywords');
    const [keywordDetails, setKeywordDetails] = useState(new JobKeywordModel());
    const [parentKeywords, setParentKeywords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await service.getDetail(props.id);
            let parentResponse = await service.getList({ parent: '' }, PARENT_KEYWORDS);
            if (response.data && response.data.length > 0) {
                setKeywordDetails({ ...response.data[0] });
            }
            if (parentResponse.data && parentResponse.data.length > 0) {
                setParentKeywords([...parentResponse.data ]);
            }
        }
        fetchData();
    }, []);

    const saveData = async event => {
        event.preventDefault();

        if (!props.id) {
            let response = await service.add({ ...keywordDetails, _id: new ObjectID() });
            handleResponse(response);
        }
        else {
            let response = await service.update(keywordDetails);
            handleResponse(response);
        }
    }

    const handleResponse = (response) => {
        if (response.message != '') {
            if (response.success) {
                router.push('/private/control-panel/keywords')
            }
            else if (!response.success)
                toast.error(response.message)
        }
    }

    return (
        <AdminLayout>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <h4 className="ml-3 mr-3 border-bottom pb-2 mt-3">Keyword Form</h4>
                <div className="row m-0">
                    <div className="col-md-8 mb-2">
                        <form onSubmit={saveData}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="mr-2">Select Parent: </label>
                                        <select className="form-control" name="parent" onChange={e => setKeywordDetails(CommonService.handleInputChange(e, keywordDetails))} value={keywordDetails.parent}>
                                            <option value="">Select parent</option>
                                            {parentKeywords.length > 0 && parentKeywords.map((item, i) => <option key={i} value={item._id}>{item.keyword}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Keyword:</label>
                                        <input type="text" className="form-control" onChange={e => setKeywordDetails(CommonService.handleInputChange(e, keywordDetails))} value={keywordDetails.keyword} name="keyword" />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary float-right ml-3">Save Changes</button>
                                    <button type="button" className="btn btn-secondary float-right" onClick={x => router.push('/private/control-panel/keywords')}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default KeywordForm;