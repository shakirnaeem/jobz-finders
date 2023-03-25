import React from "react";
import router from "next/router";
import Link from "next/link";
import Paging from "@/src/components/paging";

const DataGrid = ({
    title, formRoute, fields, data, page, handlePageClick, handleDeleteClick
}) => {
    return (
        <div className="col-md-10 col-sm-12 col-xs-12 float-right main">
            <div className="d-flex justify-content-between m-2"><h4 className="ml-3 mr-3 pb-2 mt-3">{title}</h4>
                <button className="btn btn-primary btn-sm m-3" onClick={x => router.push(`${formRoute}`)}>Add New</button></div>
            <div className="row m-0">
                <div className="col-md-12 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {fields.map((f, i) =>
                                            <th key={`field-${i}`}>{f.title}</th>
                                        )}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) =>
                                        <tr key={`data-${i}`}>
                                            {fields.map((f, j) =>
                                                <td key={`data-${i}-${j}`}>{item[f.name]}</td>
                                            )}
                                            <td>
                                                <Link className="text-warning" href={`${formRoute}/${item._id}`}>Edit</Link>&nbsp;|&nbsp;
                                                <a onClick={() => handleDeleteClick(item)} className="text-danger cursor-pointer">Delete</a>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {page && <div className='row'>
                <div className='col-md-12 d-flex justify-content-center'>
                    {data.length > 0 && <Paging onPageClick={handlePageClick} itemsPerPage={page.itemsPerPage} currentPage={page.currentPage} totalItems={page.totalItems} />}
                </div>
            </div>
            }
        </div>
    );
}

export default DataGrid;