import TopNav from '@/src/screens/shared/navs/top-nav.js'
import AdminSideNav from '@/src/screens/shared/navs/admin-side-nav.js'
import { useState } from 'react'
import GrowSpinner from '@/src/components/spinner'
import Header from './header'
import Footer from './footer'

export default function MasterLayout({ children, ...pageProps }) {
    return <>
        <Header></Header>
        {children}
        <Footer></Footer>
    </>
}