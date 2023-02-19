import paginate from "@/util/paginate";

const Paging = (props) => {
    let {
        itemsPerPage,
        currentPage,
        totalItems,
        onPageClick
    } = props

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginateData = paginate({ current: currentPage, max: totalPages });
    const prevClass = currentPage == 1 ? 'page-item disabled' : 'page-item';
    const nextClass = currentPage == totalPages ? 'page-item disabled' : 'page-item';
    
    return <ul className="pagination">
        {
            paginateData &&
            <>
            <li className={prevClass}><a className='page-link' onClick={() => onPageClick(paginateData.prev)} href='javascript:void(0)'>Previous</a></li>
            {
                paginateData.items.map(function (item, i) {
                    if (item == currentPage)
                        return <li key={item} className="page-item active"><a className="page-link" href='javascript:void(0)'>{item}</a></li>
                    else if (item === '…')
                        return <li key={item} className="page-item disabled"><a className="page-link" href='javascript:void(0)'>{item}</a></li>
                    else
                        return <li key={item} className="page-item"><a className="page-link" onClick={() => onPageClick(item)} href='javascript:void(0)'>{item}</a></li>
                })
            }
            <li className={nextClass}><a className='page-link' onClick={() => onPageClick(paginateData.next)} href='javascript:void(0)'>Next</a></li>
            </>
        }
    </ul>
}

export default Paging;