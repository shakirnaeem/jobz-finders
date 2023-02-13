import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { addJobAction, clearJobResponseAction, getJobDetailsAction, updateJobAction } from "@/src/actions/job-actions";
import { addJobImageAction, updateJobImageAction } from "@/src/actions/job-image-actions";
import { useRouter } from "next/router";
import JobModel from "@/src/models/job-model";
import ObjectID from "bson-objectid";
import DatePicker from "react-datepicker";
import JobKeywordPopup from "@/src/components/jobs/job-keywords-popup.component";
import { CommandAction } from "@/src/enums/response-status-enum";
import { ToastContainer, toast } from 'react-toastify'

const JobForm = (props) => {
    var router = useRouter();
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const firstUpdate = useRef(true);
    const [jobDetails, setJobDetails] = useState(new JobModel());

    const [imageFile, setImageFile] = useState(null);
    const [extension, setExternsion] = useState('');
    const [changeFile, setChangeFile] = useState(false);
    const [imageExists, setImageExists] = useState(false);
    const [adDate, setAdDate] = useState(new Date());

    const commandResponse = useSelector(state => state.jobCommandResponse);
    const jobImageCommandResponse = useSelector(state => state.jobImageCommandResponse);
    const jobDetailResponse = useSelector(state => state.getJobDetail);

    if (commandResponse.message != '') {
        if (commandResponse.success && jobImageCommandResponse.success) {
            router.push('/private/control-panel/jobs')
        }
        else if (!commandResponse.success)
            toast.error(commandResponse.message)
    }

    useEffect(() => {
        if (jobDetailResponse.data._id) {
            const result = jobDetailResponse.data;
            const dateResponse = result.adDate ? new Date(result.adDate) : new Date()
            setImageExists(result.fileName && result.fileName != '');
            setJobDetails(JSON.parse(JSON.stringify(result)))
            setAdDate(dateResponse)
        }
    }, [jobDetailResponse])

    useEffect(() => {
        if (firstUpdate.current) {
            setJobDetails(new JobModel())
            dispatch(clearJobResponseAction());
            dispatch(getJobDetailsAction(props.id));
            firstUpdate.current = false;
        }
    }, [props])

    const handleCancel = () => {
        setModal(false)
    }

    const handleOk = (selectedKeywords) => {
        jobDetails.keywords = selectedKeywords;
        setJobDetails({ ...jobDetails })
        setModal(false)
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var fileName = event.target.files[0].name;
            setImageFile(event.target.files[0]);
            setExternsion(fileName.split('.')[1]);
            // const reader = new FileReader();
            // reader.onload = () => {
            //     setImageFile(reader.result);
            // };

            // reader.readAsDataURL(event.target.files[0]);
        }
    };

    const saveData = async event => {
        event.preventDefault()
        const id = new ObjectID()

        jobDetails.adDate = new Date(adDate);
        var jobImageModel = {
            fileName: `${id}.${extension}`,
            imageFile: imageFile
        };

        if (!props.id) {
            jobDetails.fileName = '';
            jobDetails._id = id;
            if (jobImageModel.imageFile) {
                jobDetails.fileName = jobImageModel.fileName;
                dispatch(addJobImageAction(jobImageModel));
            }
            dispatch(addJobAction(jobDetails));
        }
        else {
            debugger
            jobDetails._id = props.id;
            if (jobImageModel.imageFile != null && jobImageModel.imageFile != '') {
                jobImageModel.fileName = `${props.id}.${extension}`;
                const existingFileName = jobDetails.fileName;
                jobDetails.fileName = jobImageModel.fileName;
                dispatch(updateJobImageAction({ ...jobImageModel, existingFile: existingFileName }));
            }
            dispatch(updateJobAction(jobDetails));
        }
    }

    const handleInputChange = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        jobDetails[name] = value;
        setJobDetails({ ...jobDetails })
    }

    const handleDatePickerChange = async (value) => {
        setAdDate(value)
    }

    return (
        <AdminLayout>
            <JobKeywordPopup isOpen={modal} handleCancel={handleCancel} handleOk={handleOk}></JobKeywordPopup>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <ToastContainer position="top-right" />
                <h4 className="ml-3 mr-3 border-bottom pb-2 mt-3">Job Form</h4>
                <div className="row m-0">
                    <div className="col-md-8 mb-2">
                        <form onSubmit={saveData}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="mr-2">Date:</label>
                                        <DatePicker className="form-control" selected={adDate} onChange={handleDatePickerChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Source:</label>
                                        <select name="adSource" onChange={handleInputChange} value={jobDetails.adSource} className="form-control">
                                            <option value="">-- Select --</option>
                                            <option value="1">Jang</option>
                                            <option value="2">The News</option>
                                            <option value="3">Dawn</option>
                                            <option value="4">Nawa-i-Waqt</option>
                                            <option value="5">Express</option>
                                            <option value="6">The Nation</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Type:</label>
                                        <select name="adType" onChange={handleInputChange} value={jobDetails.adType} className="form-control">
                                            <option value="">-- Select --</option>
                                            <option value="1">Job</option>
                                            <option value="2">Admission</option>
                                            <option value="3">Tender</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Title:</label>
                                        <input type="text" className="form-control" onChange={handleInputChange} value={jobDetails.title} name="title" placeholder="Please enter title" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Positions:</label>
                                        <textarea className="form-control" onChange={handleInputChange} value={jobDetails.positions} name="positions"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Locations:</label>
                                        <textarea className="form-control" onChange={handleInputChange} value={jobDetails.locations} name="locations"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div><label className="mr-2">Keywords:</label></div>
                                            <div><button type="button" className="btn btn-sm btn-primary m-1" onClick={() => setModal(true)}>Keywords Bank</button></div>
                                        </div>

                                        <textarea className="form-control" onChange={handleInputChange} value={jobDetails.keywords} name="keywords"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Detail:</label>
                                        <textarea className="form-control" onChange={handleInputChange} value={jobDetails.adDetail} name="adDetail"></textarea>
                                    </div>
                                    {imageExists && !changeFile &&
                                        <div className="form-group">
                                            <label className="mr-2">File: </label>
                                            <label>File attached</label>
                                            <button type="button" onClick={() => setChangeFile(true)} className="btn btn-primary ml-5">Change file</button>
                                        </div>
                                    }
                                    {(!imageExists || changeFile) &&
                                        <div className="form-group">
                                            <label className="mr-2">File: </label>
                                            <input type="file" onChange={uploadToClient} className="form-control" />
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label className="mr-2">Active: </label>
                                        <input type="checkbox" name="active" onChange={handleInputChange} checked={jobDetails.active} className="ml-3" />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary float-right ml-3">Save Changes</button>
                                    <button type="button" className="btn btn-secondary float-right" onClick={x => router.push('/private/control-panel/jobs')}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default JobForm;