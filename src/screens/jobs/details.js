import Image from 'next/image'
import Layout from '@/src/screens/shared/layout/Layout'
import CommonService from '@/src/services/common-service'
import { useEffect, useState } from 'react';
import { getJobDetailsAction } from '@/src/actions/job-actions';
import { useSelector, useDispatch } from 'react-redux';
import JobModel from '@/src/models/job-model';

export default function JobDetails(props) {
    const fileBasePath = 'https://storage.googleapis.com/car-renting-storage-bucket/';
    const dispatch = useDispatch();
    const [totalPositions, setTotalPositions] = useState(0)
    const [positionData, setPositionData] = useState([])
    const adSourceList = ['', 'Jang', 'The News', 'Dawn', 'Nawa-i-Waqt', 'Express', 'The Nation'];

    const jobDetailsData = useSelector(state => state.getJobDetail);
    const jobDetails = jobDetailsData.data;

    useEffect(() => {
        dispatch(getJobDetailsAction(props.id))
        if (jobDetails._id && jobDetails._id != '') {
            getPositionCount(jobDetails.positions)
            formatPositions(jobDetails.positions)
        }
    }, [props])

    useEffect(() => {
        if (jobDetails._id && jobDetails._id != '') {
            getPositionCount(jobDetails.positions)
            formatPositions(jobDetails.positions)
        }
    }, [jobDetails.positions])

    const getPositionCount = (positions) => {
        console.log('position count handler', jobDetails._id)
        if (positions) {

            var positionCount = 0
            var positionsList = positions.split('\n')

            if (positionsList && positionsList.length > 0)
                positionCount = positionsList.filter(x => x.indexOf('===') == -1).length
            setTotalPositions(positionCount)
            console.log(totalPositions)
        }
    }

    const formatPositions = (positions) => {
        if (positions) {
            var positionResponse = [];
            var positionsList = positions.split('\n');
            positionsList.forEach(item => {
                if (item.indexOf('===') == -1) {
                    var positionItems = item.split(' ');
                    if (positionItems.length >= 2 && !isNaN(positionItems[0]))
                        positionResponse.push({ title: item.replace(positionItems[0], ''), count: positionItems[0].trim(), type: 'data' })
                    else
                        positionResponse.push({ title: item, count: '', type: 'data' })
                }
                else {
                    var positionItems = item.split('===');
                    if (positionItems.length >= 2)
                        positionResponse.push({ title: positionItems[1].trim(), count: 0, type: 'head' })
                }
            });

            setPositionData(positionResponse)
        }
    }


    return (
        <Layout>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <h4 className="ml-3 mr-3 border-bottom pb-2 mt-3">{jobDetails.title}</h4>
                <div className="row m-0">
                    <div className="col-md-12 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="border-bottom pb-2 text-danger">Job Details</h5>
                                        <div className="d-flex border-bottom pt-2 pb-2 mb-2">
                                            <div className="mr-auto">Date</div>
                                            <div className="badge badge-info p-2">{jobDetails.adDate && CommonService.toDateString(new Date(jobDetails.adDate))}</div>
                                        </div>
                                        <div className="d-flex border-bottom pt-2 pb-2 mb-2">
                                            <div className="mr-auto">Newspaper</div>
                                            <div className="badge badge-info p-2">{adSourceList[jobDetails.adSource]}</div>
                                        </div>
                                        <div className="d-flex border-bottom pt-2 pb-2 mb-2">
                                            <div className="mr-auto">Location</div>
                                            <div className="badge badge-info p-2">{jobDetails.locations}</div>
                                        </div>
                                        <div className="d-flex border-bottom pt-2 pb-2 mb-2">
                                            <div className="mr-auto">Total Posts</div>
                                            <div className="badge badge-info p-2">{totalPositions}</div>
                                        </div>
                                        <h5 className="border-bottom pb-2 text-danger mt-5">Available Posts</h5>
                                        {
                                            positionData.map((x, i) =>
                                                <>
                                                    {x.type == 'head' &&
                                                        <h6 key={i} className="border-bottom pb-2 mt-3">{x.title}</h6>}

                                                    {x.type == 'data' &&
                                                        <div key={i} className="d-flex border-bottom pt-2 pb-2 mb-2">
                                                            <div className="mr-auto">{x.title}</div>
                                                            <div className="badge badge-info p-2">{x.count}</div>
                                                        </div>}
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        {jobDetails.fileName && <img src={`${fileBasePath}${jobDetails.fileName}`} width={692} height={1181} className="col-12" />}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-12">
                                        <div dangerouslySetInnerHTML={{ __html: jobDetails.adDetail }}></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div dangerouslySetInnerHTML={{ __html: jobDetails.keywords }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}