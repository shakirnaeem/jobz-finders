import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { addKeywordAction, getParentKeywordsAction, clearKeywordResponseAction, getKeywordDetailsAction, updateKeywordAction } from "../../../actions/keyword-actions";
import KeywordDropdown from "@/src/components/keywords/keyword-dropdown.component";
import { useRouter } from "next/router";
import JobKeywordModel from "@/src/models/job-keyword-model";
import ObjectID from "bson-objectid";

const KeywordForm = (props) => {
    var router = useRouter();
    const dispatch = useDispatch();

    const firstUpdate = useRef(true);
    const [keyword, setKeyword] = useState('');
    const [parent, setParent] = useState('');
    const [keywordDetails, setKeywordDetails] = useState(new JobKeywordModel());
    
    const response = useSelector(state => state.keywordCommandResponse);

    useEffect(async () => {
        if (firstUpdate.current) {
            dispatch(clearKeywordResponseAction());
            dispatch(getParentKeywordsAction());
            firstUpdate.current = false;
        }
        if (props.id) {
            var result = await getKeywordDetailsAction(props.id)
            setKeywordDetails(result)
            setKeyword(result.keyword || '')
            setParent(result.parent)
        }
    }, [props])

    const saveData = async event => {
        event.preventDefault()
        keywordDetails.keyword = keyword;
        keywordDetails.parent = parent;
        if (!props.id) {
            keywordDetails._id = new ObjectID()
            dispatch(addKeywordAction(keywordDetails));
        }
        else {
            keywordDetails._id = props.id
            dispatch(updateKeywordAction(keywordDetails));
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
                                    {response.success && response.message != '' &&
                                        <div className="alert alert-success">
                                            {response.message}
                                            <button type="button" className="close" onClick={x => dispatch(clearKeywordResponseAction(false, ''))}>
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                    }

                                    {!response.success && response.message != '' &&
                                        <div className="alert alert-danger">
                                            {response.message}
                                            <button type="button" className="close" onClick={x => dispatch(clearKeywordResponseAction(false, ''))}>
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label className="mr-2">Select Parent: </label>
                                        <KeywordDropdown handleChange={e => setParent(e.target.value)} id={parent}></KeywordDropdown>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Keyword:</label>
                                        <input type="text" className="form-control" onChange={e => setKeyword(e.target.value)} value={keyword} name="keyword" />
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