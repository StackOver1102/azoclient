import React, { ReactNode, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { TypeHeader } from "@/types/enum";
import FooterLayout from "../FooterLayout/FooterLayout";

interface LayoutProps {
    children: ReactNode;
    token: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, token }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isLogin={!!token} token={token} isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Main content */}
            <div className="flex-1 lg:ml-64 bg-[#f9fafb] min-h-screen">
                {/* Header */}
                <Header
                    logo="/images/logo4.png"
                    token={token}
                    type={TypeHeader.OTHER}
                    toggleSidebar={toggleSidebar}
                />

                <div>
                    {children}
                </div>
                <FooterLayout />
            </div>
        </div>
    );
};

export default Layout;
