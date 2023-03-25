import { useRouter } from 'next/router'
import Link from 'next/link'
import navigationData from '@/pages/navigation-data.json';

export default function Header({ children, ...pageProps }) {
    const router = useRouter()
    return <>
        <header>
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                <div className="logo">
                                    <a onClick={() => router.push('/')}>
                                        <img src="/logo.png" width="150px" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <div className="menu-wrapper">
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                <li><Link href={{ pathname: '/' }}>Home</Link></li>
                                                {navigationData && navigationData.navigations.length > 0 &&
                                                    navigationData.navigations.map(function (item, i) {
                                                        return <li key={`category_${i}`}><Link href={{}}>{item.category}</Link>
                                                            <ul key={`nav_item_${i}`} className="submenu">
                                                                {item.navs && item.navs.length > 0 &&
                                                                    item.navs.map(function (subItem, j) {
                                                                        return <li key={`nav_subitem_${i}_${j}`}><Link href={{ pathname: `/job_type/${subItem.key}`, query: { key: subItem.key } }}>{subItem.title}</Link></li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </nav>
                                    </div>

                                    {/* <div className="header-btn d-none f-right d-lg-block">
                                        <a href="https://preview.colorlib.com/theme/jobfinderportal/#" className="btn head-btn1">Register</a>
                                        <a href="https://preview.colorlib.com/theme/jobfinderportal/#" className="btn head-btn2">Login</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
}