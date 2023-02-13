import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllKeywordsAction, getKeywordsTreeAction } from "@/src/actions/keyword-actions";
import CommonService from "@/src/services/common-service";

const JobKeywordPopup = (props) => {
    const {
        handleCancel,
        handleOk,
        isOpen
    } = props

    const [keywords, setKeywords] = useState([]);

    const dispatch = useDispatch()
    const keywordsData = useSelector(state => state.getAllKeywords)

    let selectedKeywords = [];

    useEffect(() => {
        dispatch(getKeywordsTreeAction())
    }, []);

    useEffect(() => {
        if (keywordsData.data && keywordsData.data.length > 0) {
            setKeywords(keywordsData.data);
        }
    }, [keywordsData.data]);

    const handleSearch = (e) => {
        const searchKey = e.target.value;
        if (searchKey != '') {
            const filteredKeywords = keywordsData.data.filter(x => x.keyword.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
            setKeywords(filteredKeywords);
        }
    }

    const selectKeyword = e => {
        var selectedParent = Number(e.target.attributes['parent'].value)
        if (e.target.checked)
            selectedKeywords.push(e.target.value)
        else
            selectedKeywords = selectedKeywords.filter(x => x != e.target.value)
    }

    const publishKeywords = () => {
        var finalSelectedKeywords = '';
        if (selectedKeywords && selectedKeywords.length > 0) {
            var keywordList = [];
            selectedKeywords.forEach(x => {
                var dbKeyword = keywords.filter(y => y._id == x)[0];
                keywordList.push({ keyword: dbKeyword.keyword, parent: dbKeyword.parent })
            })
            var groupedKeywords = CommonService.groupBy(keywordList, 'parent')
            for (var key of Object.keys(groupedKeywords)) {
                var groupValues = groupedKeywords[key]
                finalSelectedKeywords += `<span class="badge badge-secondary p-2 m-1">${key}</span>`
                if (groupValues.length > 0) {
                    groupValues.forEach(x => {
                        finalSelectedKeywords += `<span class="badge badge-secondary p-2 m-1">${x.keyword}</span>`
                    })
                }
                finalSelectedKeywords += '\n'
            }
        }
        handleOk(finalSelectedKeywords)
    }

    return <Modal isOpen={isOpen} className=''>
        <ModalHeader >Keywrods Bank</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <input type="text" className="form-control" onChange={handleSearch} placeholder="Search keyword" />
            </div>
            <ul className="list-group">
                {keywords && keywords.length > 0 && keywords.map((item, i) =>
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.parent == '' && <div><b>{item.keyword}</b></div>}
                        {item.parent != '' && <div className="ml-4">{item.keyword}</div>}
                        {item.parent != '' && <div className="col-2">
                            <input type="checkbox" value={item._id} parent={item.parent} onChange={selectKeyword} className="form-control" />
                        </div>}
                    </li>
                )}
            </ul>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={publishKeywords}>Apply</Button>{' '}
            <Button color="secondary" onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
    </Modal>
}

export default JobKeywordPopup;