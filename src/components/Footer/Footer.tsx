import React from 'react';
import FooterInfoSection from './FooterInfoSection';
import FooterLinksSection from './FooterLinksSection';
import FooterBottom from './FooterBottom';

const Footer = () => {
  return (
    <footer className="mt-0">
      <div className="bg-[#13263c] pt-20">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Thông tin chính và form */}
            <FooterInfoSection />
            {/* Các liên kết (More/Contact Us) */}
            <FooterLinksSection />
          </div>
        </div>
        <div className="border-t border-[#2e4b66] mt-10"></div>
        {/* Phần cuối với logo và bản quyền */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
