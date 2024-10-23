import Link from "next/link";
import CustomImage from "../Image/Image"; // Assuming CustomImage is a custom image component
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button for mobile view */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 block lg:hidden p-2 bg-purple-700 text-white rounded-md"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Overlay layer */}
      {isOpen && (
        <div
          onClick={handleCloseSidebar} // Clicking outside will close the sidebar
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}

      <aside
        id="sidebar"
        className={`fixed top-[75px] lg:top-[94px] left-0 z-40 w-64 h-[calc(100vh-72px)] pt-8 border-r border-gray-200 dark:border-gray-600 flex flex-col justify-between bg-purple-700 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:overflow-y-visible overflow-y-auto`}
        aria-label="Sidebar"
      >
        {/* Sidebar links and logo */}
        <div className="flex-grow">
          <div className="flex justify-center mb-6">
            <CustomImage
              alt="Logo"
              src={"/images/logo4.png"}
              className="h-[150px]"
              height={100}
              width={196}
            />
          </div>
          <div className="h-full px-3 pb-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/new"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-cart-shopping text-lg text-white"></i>
                  <span className="text-xl">New Order</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-user text-lg text-white"></i>
                  <span className="text-xl">Mass Order</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-cog text-lg text-white"></i>
                  <span className="text-xl">My Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-list text-lg text-white"></i>
                  <span className="text-xl">Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/refill"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-sync text-lg text-white"></i>
                  <span className="text-xl">Refill</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/add-funds"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-money-bill-wave text-lg text-white"></i>
                  <span className="text-xl">Add Funds</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-headset text-lg text-white"></i>
                  <span className="text-xl">Support</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-sliders text-lg text-white"></i>
                  <span className="text-xl">Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cashflow"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-chart-line text-lg text-white"></i>
                  <span className="text-xl">Cash Flow</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-user-friends text-lg text-white"></i>
                  <span className="text-xl">Affiliate</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/api-documentation"
                  className="flex items-center space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-file-code text-lg text-white"></i>
                  <span className="text-xl">API Documentation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
