import { useRouter } from 'next/router'
import CommonService from '@/src/services/common-service'
import Layout from '@/src/screens/shared/layout/Layout'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Paging from '@/src/components/paging'
import OperationService from "@/src/services/operation-service";
import PageModel from "@/src/models/page-model";
import { JOB_LIST } from "@/src/constants/response-type-constants";

export default function JobListing(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(new PageModel());

    const service = new OperationService(dispatch, 'jobs');
    useEffect(() => {
        const fetchData = async () => {
            const queryModel = props.searchParam ? { keywords: props.searchParam } : null;
            let response = await service.getPagedList(queryModel, JOB_LIST, page.currentPage);
            if (response.success && response.data.length > 0) {
                setData(response.data);
                setPage({ ...page, totalItems: response.count });
                setTimeout(() => { 
                    window.scrollTo(0,0) 
                }, 500);
            }
        }
        fetchData();
    }, [page.currentPage]);

    const handlePageClick = (pageNo) => {
        setPage({ ...page, currentPage: pageNo })
    }

    function gotoDetails(id) {
        router.push(`/details/${id}`)
    }

    const renderJobs = () => {
        if (data instanceof Array) {
            return data.map(function (item, i) {
                return <div key={i} className="col-md-12 mb-2">
                    <div className="border rounded p-3">
                        <h5>{item.title}</h5>
                        <div className="text-muted mb-4">{formatPositions(item.positions)}</div>
                        <div className="d-flex justify-content-between text-app"><div>{item.locations}<br />{CommonService.toDateString(new Date(item.adDate))}</div>
                            <div><button className="btn btn-app" onClick={x => gotoDetails(item._id)}>View Details</button></div></div>
                    </div>
                </div>
            }, this)
        }
    }

    const formatPositions = (positions) => {
        var positionResponse = '';
        var positionsList = positions.split('\n');
        positionsList.forEach(item => {
            if (item.indexOf('===') == -1) {
                var positionItems = item.split(' ');
                if (positionItems.length > 1)
                    positionResponse += `${positionItems[1].trim()} (${positionItems[0].trim()}) | `
            }
        });
        if (positionResponse != '') {
            positionResponse = positionResponse.substr(0, positionResponse.length - 3);
        }
        return positionResponse;
    }

    return (
        <Layout>
            <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
                <h4 className="ml-3 mr-3 border-bottom pb-2 mt-3">{props.title}</h4>
                <div className="row m-0">
                    {data.length > 0 && renderJobs()}
                    {data.length == 0 &&
                        <div className="col-md-12 mb-2">
                            <div className="border rounded p-3">
                                <h6 className="text-center">No jobs found.</h6>
                            </div>
                        </div>
                    }
                </div>
                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-center'>
                        {data.length > 0 && <Paging onPageClick={handlePageClick} itemsPerPage={page.itemsPerPage} currentPage={page.currentPage} totalItems={page.totalItems} />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}