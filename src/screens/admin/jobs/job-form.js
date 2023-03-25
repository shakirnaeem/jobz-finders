import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { useRouter } from "next/router";
import JobModel from "@/src/models/job-model";
import ObjectID from "bson-objectid";
import DatePicker from "react-datepicker";
import JobKeywordPopup from "@/src/components/jobs/job-keywords-popup.component";
import { ToastContainer, toast } from 'react-toastify'
import FileService from "@/src/services/file-service";
import CommonService from "@/src/services/common-service";
import OperationService from "@/src/services/operation-service";

const JobForm = (props) => {
    var router = useRouter();
    const dispatch = useDispatch();
    const service = new OperationService(dispatch, 'jobs');
    const [modal, setModal] = useState(false);
    const [jobDetails, setJobDetails] = useState(new JobModel());
    const [existingFileName, setExistingFileName] = useState(null);

    let imageFile = null;

    useEffect(() => {
        const fetchData = async () => {
            let response = await service.getDetail(props.id);
            if (response.data && response.data.length > 0) {
                response.data[0].adDate = new Date(response.data[0].adDate);
                setExistingFileName(response.data[0].fileName);
                setJobDetails({ ...response.data[0] });
            }
        }
        fetchData();
    }, []);

    const handleOk = (selectedKeywords) => {
        jobDetails.keywords = selectedKeywords;
        setModal(false)
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var fileName = event.target.files[0].name;
            jobDetails.fileName = `${jobDetails._id}.${fileName.split('.')[1]}`;
            const reader = new FileReader();
            reader.onload = () => {
                imageFile = reader.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const saveData = async event => {
        event.preventDefault()
        var jobImageModel = {
            fileName: `${jobDetails.fileName}`,
            file: imageFile
        };

        if (!props.id) {
            if (jobImageModel.file) {
                FileService.uploadFile(jobImageModel);
            }
            let response = await service.add({ ...jobDetails, _id: new ObjectID() });
            handleResponse(response);
        }
        else {
            if (jobImageModel.file != null && jobImageModel.file != '') {
                jobDetails.fileName = jobImageModel.fileName;
                FileService.updateFile({ ...jobImageModel, existingFileName: existingFileName });
            }
            let response = await service.update(jobDetails);
            handleResponse(response);
        }
    }

    const handleResponse = (response) => {
        if (response.message != '') {
            if (response.success) {
                router.push('/private/control-panel/jobs')
            }
            else if (!response.success)
                toast.error(response.message)
        }
    }

    return (
        <AdminLayout>
            <JobKeywordPopup isOpen={modal} handleCancel={() => setModal(false)} handleOk={handleOk}></JobKeywordPopup>
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
                                        <DatePicker className="form-control" selected={jobDetails.adDate} onChange={value => setJobDetails(CommonService.handleDatePickerChange('adDate', value, jobDetails))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Source:</label>
                                        <select name="adSource" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.adSource} className="form-control">
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
                                        <select name="adType" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.adType} className="form-control">
                                            <option value="">-- Select --</option>
                                            <option value="1">Job</option>
                                            <option value="2">Admission</option>
                                            <option value="3">Tender</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Title:</label>
                                        <input type="text" className="form-control" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.title} name="title" placeholder="Please enter title" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Positions:</label>
                                        <textarea className="form-control" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.positions} name="positions"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Locations:</label>
                                        <textarea className="form-control" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.locations} name="locations"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div><label className="mr-2">Keywords:</label></div>
                                            <div><button type="button" className="btn btn-sm btn-primary m-1" onClick={() => setModal(true)}>Keywords Bank</button></div>
                                        </div>

                                        <textarea className="form-control" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.keywords} name="keywords"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Detail:</label>
                                        <textarea className="form-control" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} value={jobDetails.adDetail} name="adDetail"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">File: </label>
                                        <button type="button" className="btn btn-primary ml-5" onClick={x => document.getElementById('job-image').click() }>
                                            {jobDetails.fileName ? 'Change File' : 'Upload File'}
                                        </button>
                                        <input type="file" id="job-image" style={{ display: 'none' }} onChange={uploadToClient} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="mr-2">Active: </label>
                                        <input type="checkbox" name="active" onChange={e => setJobDetails(CommonService.handleInputChange(e, jobDetails))} checked={jobDetails.active} className="ml-3" />
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