import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { getAllKeywordsAction, deleteKeywordAction } from "@/src/actions/keyword-actions";
import router, { useRouter } from "next/router";
import Link from "next/link";

const KeywordList = () => {
    var route = useRouter();
    const dispatch = useDispatch();
    const response = useSelector(state => state.getAllKeywords);
    const deleteKeyword = (item) => {
        if (confirm("Are you sure, you want to delete?")) {
            dispatch(deleteKeywordAction(item));
        }
    }

    useEffect(() => {
        dispatch(getAllKeywordsAction());
    }, []);
    return (
        <AdminLayout>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <div className="d-flex justify-content-between m-2"><h4 className="ml-3 mr-3 pb-2 mt-3">Keyword List</h4>
                    <button className="btn btn-primary btn-sm m-3" onClick={x => router.push('/private/control-panel/keywords/form')}>Add New</button></div>
                <div className="row m-0">
                    <div className="col-md-12 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Keyword</th>
                                            <th>Parent</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {response.data.map((item, i) =>
                                            <tr key={i}>
                                                <td>{item.keyword}</td>
                                                <td>{item.parent}</td>
                                                <td>
                                                    <Link href={`/private/control-panel/keywords/form/${item._id}`}><a className="text-warning">Edit</a></Link>&nbsp;|&nbsp;
                                                    <a onClick={x => deleteKeyword(item)} className="text-danger cursor-pointer">Delete</a>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default KeywordList;