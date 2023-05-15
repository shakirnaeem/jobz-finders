import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import path from 'path'
import { NavigationMainModel } from '@/src/models/navigation-model';
import { useEffect, useState } from 'react';
import navigationData from '@/pages/navigation-data.json';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function SideNav(props) {

    let toggleSideNavClass = props.toggleSideNav ? '' : ' d-none d-sm-none d-md-none'
    return <div id="app-side-nav" className={`sidenav col-md-2 col-6 ml-1 d-lg-flex rounded${toggleSideNavClass}`}>
        <FontAwesomeIcon icon={faClose} className="text-light d-lg-none d-md-none" onClick={() => props.setToggleSideNav(!props.toggleSideNav)} />
        <i className="closenav fa fa-close d-lg-none d-md-none"></i>
        {navigationData && navigationData.navigations.length > 0 &&
            navigationData.navigations.map(function (item, i) {
                return <div key={`main_${i}`}>
                    <div id={`category_${i}`} key={`category_${i}`} className="side-nav-head first mt-4">{item.category}</div>
                    <ul id={`nav_item_${i}`} key={`nav_item_${i}`} className="list-group">
                        { item.navs && item.navs.length > 0 &&
                            item.navs.map(function (subItem, j) {
                                return <li key={`nav_subitem_${i}_${j}`} className="list-group-item"><Link className='text-white' href={{ pathname: `/job_type/${subItem.key}`, query: { key: subItem.key } }}>{subItem.title} <FontAwesomeIcon icon={faAngleRight} className="float-right" /></Link></li>
                            })
                        }
                    </ul>
                </div>
            })
        }
    </div>
}