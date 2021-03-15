import React from 'react'
import ContentWrapper from './ContentWrapper'
import Sidebar from './Sidebar'
import LogoutModal from './LogoutModal';

export default function Main({ children, title }) {
    // Main-> Content Wrapper -> Header
    // Main-> Siderbar
    // Main-> Footer
    return (
        <div>
            {/* <!-- content start --> */}

            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                <Sidebar />
                {/* <!-- EndofSidebar --> */}
                {/* <!-- Content Wrapper --> */}
                <ContentWrapper title={title}>
                    {children}
                </ContentWrapper>
                {/* <!-- End of Content Wrapper --> */}
            </div>
            {/* <!-- End of Page Wrapper --> */}
            {/* <!-- Scroll to Top Button--> */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            {/* <!-- Logout Modal--> */}
            <LogoutModal />
            {/* <!-- content end --> */}
        </div>
    )
}
