const FooterInfoSection = () => {
    return (
      <div className="flex flex-col">
        <div className="rounded-lg border border-[#2e4b66] p-9 mb-10 bg-[#1a3a5c] shadow-lg">
          <h2 className="text-white text-2xl mb-4">Need more information?</h2>
          <p className="font-normal text-xl text-gray-300">
            Email us at{' '}
            <a
              href="mailto:support@1tap.top"
              className="text-white hover:text-[#009ef7] transition-colors"
            >
              support@1tap.top
            </a>
          </p>
        </div>
        <div className="rounded-lg border border-[#2e4b66] p-9 bg-[#1a3a5c] shadow-lg">
          <h2 className="text-white text-2xl mb-4">Need reseller prices?</h2>
          <p className="font-normal text-xl text-gray-300">
            Email us at{' '}
            <a
              href="mailto:support@1tap.top"
              className="text-white hover:text-[#009ef7] transition-colors"
            >
              support@1tap.top
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default FooterInfoSection;
  