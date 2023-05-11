import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import CommonService from "@/src/services/common-service";

export default function SearchBar(props) {
    const router = useRouter()
    const [searchKeyword, setSearchKeyword] =  useState({ search: '' });
    function performSearch() {
        router.push('/job_search?search=' + searchKeyword.search);
    }
    function toggle() {
        props.setToggleSideNav(!props.toggleSideNav)
    }

    return <div className="row d-flex justify-content-center search-bar fixed-top">
        <div className="col-6">
            <form className="form-inline"><div className="input-group col-12">
                <input type="text" name="search" className="form-control" id="search_id" onChange={e => setSearchKeyword(CommonService.handleInputChange(e, searchKeyword))} placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1" onClick={performSearch}>
                        Search
                    </span>
                </div>
            </div>
            </form>
        </div>
    </div>
}