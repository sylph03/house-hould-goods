import React from 'react'
import Header from './Header'
import Footer from './Footer'
import CopyRight from './Copyright'
import Navbar from './Navbar'
import Breadcrumb from './Breadcrumb'

const Layout = ( {children} ) => {
    return (
        <div id='wrapper'>
            <Header/>
            <Navbar/>
            <Breadcrumb/>
            <main>
                {children}
            </main>
            <Footer/>
            <CopyRight/>
        </div>
    )
}

export default Layout