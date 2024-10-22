import CustomImage from "../Image/Image";

const FooterBottom = () => {
    return (
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <a href="/" className="mb-4 lg:mb-0">
            {/* <img alt="Logo" src="/path/to/logo.png" className="h-[80px] lg:h-[100px]" /> */}
            <CustomImage src="/images/logo4.png" className="h-[80px] lg:h-[100px]" alt="Logo" height={80} width={120}/>
          </a>
          <span className="text-gray-600 text-base md:text-lg text-center">
            © 2022 1TAP SMM Panel - Social Services
          </span>
        </div>
      </div>
    );
  };
  
  export default FooterBottom;
  