import Link from 'next/link';
import React from 'react';


const FooterLayout = () => {
    return (
        <div className="footer py-4 flex flex-col lg:flex-row items-center" id="kt_footer">
            <div className="app-container container mx-auto flex flex-col md:flex-row items-center justify-between py-3">
                <div className="text-dark order-2 md:order-1 text-center md:text-left">
                    <span className="text-[#A1A5B7] font-semibold mr-1">2024©</span>
                    <a href="https://1dg.me" target="_blank" className="text-gray-800 hover:text-primary">1TAP  SMM Panel - Social Services</a>
                </div>
                <ul className="menu flex space-x-4 text-gray-600 hover:text-primary font-semibold order-1">
                    <li className="menu-item">
                        <Link href="/" target="_blank" className="px-2">Home</Link>
                    </li>
                    <li className="menu-item">
                        <Link href="/terms" target="_blank" className="px-2">Term</Link>
                    </li>
                    <li className="menu-item">
                        <Link href="/faqs" target="_blank" className="px-2">FAQs</Link>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default FooterLayout;
