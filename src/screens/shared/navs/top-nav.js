import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavDropdown } from 'react-bootstrap';
import SearchBar from './search-bar';

export default function TopNav(props) {
    const router = useRouter()
    function gotoHome() {
        router.push('/')
    }
    function toggle() {
        props.setToggleSideNav(!props.toggleSideNav)
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <Link className="navbar-brand" href={{ pathname: `/` }}>
                <img src="/logo.png" style={{ width: 120 }} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" href={{ pathname: `/` }} >All Jobs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={{ pathname: `/job_type/industry_government`, query: { key: 'industry_government' } }} >Government Jobs</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" href={{ pathname: `/job_type/location_country_pakistan`, query: { key: 'location_country_pakistan' } }} >Jobs in Pakistan</Link>
                    </li></ul>
            </div>
        </nav>
        <SearchBar />
    </>
    {/* return <nav className="navbar navbar-default fixed-top pt-0">
        <div className="container-fluid app-nav-bar rounded pt-2 pb-2">
            <div className="navbar-header">
                <span className="d-lg-none d-md-none nav-menu text-white mr-2" onClick={toggle}>☰</span>
                <a className="navbar-brand text-white cursor-pointer" onClick={x => gotoHome()}>
                    JOBSFINDERS
                </a>
            </div>
        </div>
    </nav> */}
}