import TopNav from '@/src/screens/shared/navs/top-nav.js'
import AdminSideNav from '@/src/screens/shared/navs/admin-side-nav.js'
import { useState } from 'react'

export default function AdminLayout({ children, ...pageProps }) {
    const [toggleSideNav, setToggleSideNav] = useState(false)
    return <>
        <TopNav toggleSideNav={toggleSideNav} setToggleSideNav={setToggleSideNav}></TopNav>
        <AdminSideNav toggleSideNav={toggleSideNav} setToggleSideNav={setToggleSideNav}></AdminSideNav>
        {children}
    </>
}