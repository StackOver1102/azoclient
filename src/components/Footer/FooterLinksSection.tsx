import Link from "next/link";

const FooterLinksSection = () => {
  return (
    <div className="lg:ml-24 flex justify-center lg:justify-start">
      <div className="flex flex-col mr-12">
        <h4 className="font-semibold text-gray-400 mb-6">More</h4>
        <Link
          href="/faqs"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          FAQ
        </Link>
        <Link
          href="/terms"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/services"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          Services
        </Link>
        <Link
          href="/api"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          API
        </Link>
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold text-gray-400 mb-6">Contact Us</h4>
        <Link
          href="/faqs"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          TRAN ANH TUAN
        </Link>
        <Link
          href="mailto:tuantranptkm@gmail.com"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          tuantranptkm@gmail.com
        </Link>
        <Link
          href="tel:+18569308404"
          className="text-white opacity-75 hover:text-[#009ef7] text-lg mb-4 transition-colors"
        >
          +1 8569308404
        </Link>
      </div>
    </div>
  );
};

export default FooterLinksSection;
