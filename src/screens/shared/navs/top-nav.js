import { useRouter } from 'next/router';

export default function TopNav(props) {
    const router = useRouter()
    function gotoHome() {
        router.push('/')
    }
    function toggle() {
        props.setToggleSideNav(!props.toggleSideNav)
    }

    return <nav className="navbar navbar-default fixed-top pt-0">
        <div className="container-fluid app-nav-bar rounded pt-2 pb-2">
            <div className="navbar-header">
                <span className="d-lg-none d-md-none nav-menu text-white mr-2" onClick={toggle}>☰</span>
                <a className="navbar-brand text-white cursor-pointer" onClick={x => gotoHome()}>
                    JOBSFINDERS
                </a>
            </div>
        </div>
    </nav>
}