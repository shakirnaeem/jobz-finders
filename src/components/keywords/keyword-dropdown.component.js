import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getParentKeywordsAction } from "@/src/actions/keyword-actions";

const KeywordDropdown = (props) => {
    const keywordsData = useSelector(state => state.getParentKeywords);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getParentKeywordsAction());
    }, []);

    return <select className="form-control" name="parent" onChange={props.handleChange} value={props.id}>
        <option value="">Select parent</option>
        {keywordsData.parentKeywords.map((item, i) => <option key={i} value={item._id}>{item.keyword}</option>)}
    </select>
}

export default KeywordDropdown;