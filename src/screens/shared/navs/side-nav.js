import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import path from 'path'
import { NavigationMainModel } from '@/src/models/navigation-model';
import { useEffect, useState } from 'react';

export default function SideNav(props) {

    const [navigationModel, setNavigationModel] = useState(new NavigationMainModel());
    useEffect(() => {
        const filePath = path.join(process.cwd(), 'navigation-data.json');
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", filePath, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                setNavigationModel(JSON.parse(rawFile.responseText));
            }
        }
        rawFile.send(null);
    }, []);

    let toggleSideNavClass = props.toggleSideNav ? '' : ' d-none d-sm-none'
    return <div id="app-side-nav" className={`sidenav col-md-2 col-6 ml-1 d-lg-block d-md-block rounded${toggleSideNavClass}`}>
        <i className="closenav fa fa-close d-lg-none d-md-none"></i>
        {navigationModel && navigationModel.navigations.length > 0 &&
            navigationModel.navigations.map(function (item, i) {
                return <div key={`main_${i}`}>
                    <div id={`category_${i}`} key={`category_${i}`} className="side-nav-head first mt-4">{item.category}</div>
                    <ul id={`nav_item_${i}`} key={`nav_item_${i}`} className="list-group">
                        { item.navs && item.navs.length > 0 &&
                            item.navs.map(function (subItem, j) {
                                return <li key={`nav_subitem_${i}_${j}`} className="list-group-item"><Link href={`/job_type/${subItem.key}`}><a className="text-white">{subItem.title} <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
                            })
                        }
                    </ul>
                </div>
            })
        }
        {/* <div className="side-nav-head first mt-4">Industry Wise Jobs</div>
        <ul className="list-group">
            <li className="list-group-item"><Link href="/industry/government"><a className="text-white">Government Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/industry/education"><a className="text-white">Education Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/industry/health"><a className="text-white">Health Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/industry/bank"><a className="text-white">Bank Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/industry/it"><a className="text-white">IT Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
        </ul>
        <div className="side-nav-head first mt-4">Location Wise Jobs</div>
        <ul className="list-group">
            <li className="list-group-item"><Link href="/location/country/pakistan"><a className="text-white">Jobs In Pakistan <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/location/city/islamabad"><a className="text-white">Jobs In Islamabad <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/location/city/lahore"><a className="text-white">Jobs In Lahore <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/location/city/karachi"><a className="text-white">Jobs In Karachi <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/location/city/multan"><a className="text-white">Jobs In Multan <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/location/city/peshawar"><a className="text-white">Jobs In Peshawar <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
        </ul>
        <div className="side-nav-head first mt-4">Organization Wise Jobs</div>
        <ul className="list-group">
            <li className="list-group-item"><Link href="/organization/forces"><a className="text-white">Armed Forces Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/organization/spd"><a className="text-white">SPD Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/organization/ngo"><a className="text-white">NGO Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/organization/police"><a className="text-white">Police Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
            <li className="list-group-item"><Link href="/organization/nts"><a className="text-white">NTS Jobs <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></Link></li>
        </ul> */}
    </div>
}