import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import path from 'path'
import { NavigationMainModel } from '@/src/models/navigation-model';
import { useEffect, useState } from 'react';
import navigationData from '@/pages/navigation-data.json';

export default function SideNav(props) {

    let toggleSideNavClass = props.toggleSideNav ? '' : ' d-none d-sm-none'
    return <div id="app-side-nav" className={`sidenav col-md-2 col-6 ml-1 d-lg-block d-md-block rounded${toggleSideNavClass}`}>
        <i className="closenav fa fa-close d-lg-none d-md-none"></i>
        {navigationData && navigationData.navigations.length > 0 &&
            navigationData.navigations.map(function (item, i) {
                return <div key={`main_${i}`}>
                    <div id={`category_${i}`} key={`category_${i}`} className="side-nav-head first mt-4">{item.category}</div>
                    <ul id={`nav_item_${i}`} key={`nav_item_${i}`} className="list-group">
                        { item.navs && item.navs.length > 0 &&
                            item.navs.map(function (subItem, j) {
                                return <li key={`nav_subitem_${i}_${j}`} className="list-group-item"><a className='text-white' href={`/job_type/${subItem.key}`}>{subItem.title} <FontAwesomeIcon icon={faAngleRight} className="float-right" /></a></li>
                            })
                        }
                    </ul>
                </div>
            })
        }
    </div>
}