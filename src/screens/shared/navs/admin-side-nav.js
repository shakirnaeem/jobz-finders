import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function AdminSideNav(props) {
    let toggleSideNavClass = props.toggleSideNav ? '' : ' d-none d-sm-none'
    return <div id="app-side-nav" className={`sidenav col-md-2 col-6 ml-1 d-lg-block d-md-block rounded${toggleSideNavClass}`}>
        <i className="closenav fa fa-close d-lg-none d-md-none"></i>
        <div className="side-nav-head first mt-4">Menu</div>
        <ul className="list-group">
            <li className="list-group-item"><Link href="/private/control-panel/jobs"><a className="text-white">Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/private/control-panel/keywords"><a className="text-white">Keywords Bank <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
        </ul>
    </div>
}