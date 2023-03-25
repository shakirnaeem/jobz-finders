import React, { useEffect, useState } from "react";
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import { toast, ToastContainer } from 'react-toastify'
import PageModel from "@/src/models/page-model";
import OperationService from "@/src/services/operation-service";
import { useDispatch } from "react-redux";
import { JOB_LIST } from "@/src/constants/response-type-constants";
import DataGrid from "@/src/components/data-grid";
import CommonService from "@/src/services/common-service";
import FileService from "@/src/services/file-service";
import { useRouter } from "next/router";

const JobList = () => {
    var router = useRouter();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(new PageModel());
    const fields = [
        { name: "adDate", title: "Date" },
        { name: "adSource", title: "Source" },
        { name: "title", title: "Title" },
        { name: "active", title: "Status" }
    ];
    const adSourceList = ['', 'Jang', 'The News', 'Dawn', 'Nawa-i-Waqt', 'Express', 'The Nation'];
    const service = new OperationService(dispatch, 'jobs');
    useEffect(() => {
        const fetchData = async () => {
            let response = await service.getPagedList(null, JOB_LIST, page.currentPage);
            if (response.success && response.data.length > 0) {
                response.data.forEach(x => {
                    x.adDate = CommonService.toDateString(new Date(x.adDate));
                    x.active = x.active ? 'active' : 'Inactive';
                    x.adSource = adSourceList[x.adSource];
                });
                setData(response.data);
                setPage({ ...page, totalItems: response.count });
            }
        }
        fetchData();
    }, [page.currentPage]);

    const handlePageClick = (pageNo) => {
        setPage({ ...page, currentPage: pageNo })
    }

    const handleDeleteClick = async (item) => {
        if (confirm("Are you sure, you want to delete?")) {
            if (item.fileName != null && item.fileName != '') {
                FileService.removeFile(item.fileName);
            }
            const response = await service.delete(item);
            if (response.message != '' && !response.success) {
                toast.error(response.message);
            }
            else {
                router.push('/private/control-panel/jobs')
            }
        }
    }

    return (
        <AdminLayout>
            <ToastContainer position="top-right" />
            {data && data.length > 0 &&
                <DataGrid title="Job List" formRoute="/private/control-panel/jobs/form" handleDeleteClick={handleDeleteClick} handlePageClick={handlePageClick} page={{ ...page }} fields={fields} data={[...data]}></DataGrid>
            }
        </AdminLayout>
    );
}

export default JobList;