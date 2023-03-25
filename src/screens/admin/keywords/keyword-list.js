import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from "@/src/screens/shared/layout/admin-layout";
import OperationService from "@/src/services/operation-service";
import PageModel from "@/src/models/page-model";
import { toast, ToastContainer } from 'react-toastify'
import { KEYWORD_LIST } from "@/src/constants/response-type-constants";
import DataGrid from "@/src/components/data-grid";
import { useRouter } from "next/router";

const KeywordList = () => {
    var router = useRouter();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(new PageModel());

    const fields = [
        { name: "keyword", title: "Keyword" },
        { name: "parent", title: "Parent" }
    ];

    const service = new OperationService(dispatch, 'keywords');
    useEffect(() => {
        const fetchData = async () => {
            let response = await service.getPagedList(null, KEYWORD_LIST, page.currentPage);
            if (response.success && response.data.length > 0) {
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
            const response = await service.delete(item);
            if (response.message != '' && !response.success) {
                toast.error(response.message);
            }
            else {
                router.push('/private/control-panel/keywords')
            }
        }
    }

    return (
        <AdminLayout>
            <ToastContainer position="top-right" />
            { data && data.length > 0 &&
            <DataGrid title="Keyword List" formRoute="/private/control-panel/keywords/form" handleDeleteClick={handleDeleteClick} handlePageClick={handlePageClick} page={{...page}} fields={fields} data={[...data]}></DataGrid>
            }
        </AdminLayout>
    );
}

export default KeywordList;