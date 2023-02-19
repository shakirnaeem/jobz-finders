import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function AdminSideNav(props) {
    let toggleSideNavClass = props.toggleSideNav ? '' : ' d-none d-sm-none'
    return <div id="app-side-nav" className={`sidenav col-md-2 col-6 ml-1 d-lg-block d-md-block rounded${toggleSideNavClass}`}>
        <i className="closenav fa fa-close d-lg-none d-md-none"></i>
        <div className="side-nav-head first mt-4">Menu</div>
        <ul className="list-group">
            <li className="list-group-item"><Link className="text-white" href="/private/control-panel/jobs">Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></Link></li>
            <li className="list-group-item"><Link className="text-white" href="/private/control-panel/keywords">Keywords Bank <FontAwesomeIcon icon={faAngleRight} className="float-right" /></Link></li>
        </ul>
    </div>
}