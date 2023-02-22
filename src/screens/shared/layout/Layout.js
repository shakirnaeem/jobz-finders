import TopNav from '@/src/screens/shared/navs/top-nav.js'
import SideNav from '@/src/screens/shared/navs/side-nav.js'
import { useState } from 'react'
import GrowSpinner from '@/src/components/spinner'

export default function Layout({ children, ...pageProps }) {
    const [toggleSideNav, setToggleSideNav] = useState(false)
    return <>
        <GrowSpinner /> 
        <TopNav toggleSideNav={toggleSideNav} setToggleSideNav={setToggleSideNav}></TopNav>
        <SideNav toggleSideNav={toggleSideNav} setToggleSideNav={setToggleSideNav}></SideNav>
            {children}
    </>
}