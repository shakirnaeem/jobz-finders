import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { getAllJobsAction, deleteJobAction } from "@/src/actions/job-actions";
import router, { useRouter } from "next/router";
import Link from "next/link";
import CommonService from "@/src/services/common-service";
import JobDeletePopup from "./job-delete-popup";
import { ToastContainer, toast } from 'react-toastify'
import { clearJobResponseAction } from "@/src/actions/job-actions";

const JobList = () => {
    const adSourceList = ['', 'Jang', 'The News', 'Dawn', 'Nawa-i-Waqt', 'Express', 'The Nation'];
    var route = useRouter();
    const [modal, setModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState({});
    const dispatch = useDispatch();
    const response = useSelector(state => state.getAllJobs);
    const handleCancel = () => { setModal(false) }

    const commandResponse = useSelector(state => state.jobCommandResponse);

    const handleOk = () => {
        setModal(false)
        dispatch(deleteJobAction(selectedJob))
    }
    useEffect(() => {
        dispatch(getAllJobsAction());
    }, []);
    useEffect(() => {
        if (commandResponse.message != '') {
            if (commandResponse.success)
                toast.info(commandResponse.message);
            else
                toast.error(commandResponse.message);

            dispatch(clearJobResponseAction());
            dispatch(getAllJobsAction());
        }
    }, [commandResponse.message]);
    return (
        <AdminLayout>
            <JobDeletePopup isOpen={modal} handleCancel={handleCancel} handleOk={handleOk}></JobDeletePopup>
            <ToastContainer position="top-right" />
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <div className="d-flex justify-content-between m-2"><h4 className="ml-3 mr-3 pb-2 mt-3">Job List</h4>
                    <button className="btn btn-primary btn-sm m-3" onClick={x => router.push('/private/control-panel/jobs/form')}>Add New</button></div>
                <div className="row m-0">
                    <div className="col-md-12 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Source</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {response.data.map((item, i) =>
                                            <tr key={i}>
                                                <td>{CommonService.toDateString(new Date(item.adDate))}</td>
                                                <td>{adSourceList[item.adSource]}</td>
                                                <td>{item.title}</td>
                                                <td>{item.active ? 'active' : 'Inactive'}</td>
                                                <td>
                                                    <Link href={`/private/control-panel/jobs/form/${item._id}`}><a className="text-warning">Edit</a></Link>&nbsp;|&nbsp;
                                                    <a onClick={x => { setSelectedJob(item); setModal(true) }} className="text-danger cursor-pointer">Delete</a>
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

export default JobList;