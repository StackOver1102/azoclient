import { useState, useEffect } from "react";
import Link from "next/link";
import CustomImage from "../Image/Image";
import { UserSlice } from "@/libs/redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { TypeHearder } from "@/types/enum";

interface HeaderProps {
  logo: string;
  token: string | null;
  user: UserSlice;
  type: TypeHearder;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  token,
  user,
  type = TypeHearder.OTHE,
}) => {
  const { t } = useTranslation("common");
  const access_token = token;
  const [color, setColor] = useState(false); // Quản lý trạng thái màu sắc
  const [open, setOpen] = useState(false); // Quản lý trạng thái mở/đóng của thanh menu

  // Hàm thay đổi màu sắc khi cuộn
  const changeColor = () => {
    if (window.scrollY >= 71) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  // Thêm sự kiện scroll khi component mount
  useEffect(() => {
    window.addEventListener("scroll", changeColor);

    // Loại bỏ sự kiện scroll khi component unmount
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const renderHeader = (type: TypeHearder) => {
    switch (type) {
      case TypeHearder.HOME:
        return (
          <>
            <nav
              className={
                color
                  ? "bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
                  : "bg-[#13263c] px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-[#13263c] dark:border-gray-600"
              }
            >
              <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center">
                  <CustomImage
                    src={logo}
                    className="mr-3 h-[70px]"
                    alt="Logo"
                    height={70}
                    width={100}
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
                </Link>
                <div className="flex md:order-2">
                  <button
                    type="button"
                    className="text-white bg-[#009ef7] hover:bg-[#009ef7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {access_token ? (
                      <Link href="/new" className="text-xl">
                        Order Now!
                      </Link>
                    ) : (
                      <Link href="/signin" className="text-xl">
                        Sign in
                      </Link>
                    )}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setOpen(!open)}
                  >
                    <svg
                      className={open ? "hidden w-6 h-6" : "w-6 h-6"}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      className={open ? "w-6 h-6" : "hidden w-6 h-6"}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  className={
                    open
                      ? "justify-between items-center w-full md:flex md:w-auto md:order-1"
                      : "hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                  }
                  id="navbar-sticky"
                >
                  <div
                    className={
                      color
                        ? "flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                        : "flex flex-col p-4 mt-4 bg-[#13263c] rounded-lg border border-[#13263c] md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[#13263c] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    }
                  >
                    <div>
                      <Link
                        href="#home"
                        className="block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white cursor-pointer"
                      >
                        {t("Home")}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#test"
                        className="block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                      >
                        {t("How it Works")}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#achievements"
                        className="block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                      >
                        {t("Achievements")}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#pricing"
                        className="block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                      >
                        {t("Pricing")}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/services"
                        className="block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                      >
                        {t("Services")}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/signup"
                        className={
                          access_token
                            ? "hidden"
                            : "block py-2 pr-4 pl-3 text-xl text-[#a1a5b7] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                        }
                      >
                        {t("Sign up")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </>
        );
      default:
        return (
          <>
            <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
              <div className="flex justify-between items-center py-3 px-3 mx-auto w-full max-w-8xl lg:px-4 container">
                <div className="flex items-center">
                  {/* <button
                    id="toggleSidebarMobile"
                    aria-expanded="true"
                    aria-controls="sidebar"
                    className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      // onClick={() => {
                      //   setClick(true);
                      //   handleChange(click);
                      // }}
                      id="toggleSidebarMobileHamburger"
                      // className={click ? "w-6 h-6 hidden" : "w-6 h-6 "}
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      // onClick={() => {
                      //   setClick(false);
                      //   handleChange(click);
                      // }}
                      id="toggleSidebarMobileClose"
                      // className={!click ? "hidden w-6 h-6" : "w-6 h-6"}
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button> */}
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex">
                      <img
                        alt="Logo"
                        src={logo}
                        className="hidden lg:inline h-[70px]"
                      />
                      <img
                        alt="Logo"
                        src={logo}
                        className="lg:hidden h-[50px] w-[100px] ml-10"
                      ></img>
                    </Link>
                  </div>
                  {/* <div className="ml-6 xl:ml-16 xl:pl-4">

                        <button className='flex items-center space-x-2 border border-gray-900/10 shadow-sm px-3 py-1.5 hover:border-gray-300 focus:outline-none focus:border-gray-300  rounded-lg  w-72' onClick={() => setIsOpen(!isOpen)}>
                            <svg width="24" height="24" fill="none" aria-hidden="true" className="flex-none -ml-1 text-gray-500">
                                <path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </path>
                                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </circle>
                            </svg>
                            <span className='text-sm text-gray-400 text-left' >
                                Quick service search
                            </span>
                        </button>
                        {Modal()}
                    </div> */}
                </div>
                <div
                  className={`flex items-center ${
                    access_token ? "" : "hidden"
                  }`}
                >
                  <a
                    href="/pro/#pricing"
                    className=" inline-flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3"
                  >
                    $ {user?.money}
                  </a>
                  <svg
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 pl-3"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#f1416c"
                      d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742c-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                    />
                  </svg>
                  <div
                    id="tooltip-youtube"
                    role="tooltip"
                    className="inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip opacity-0 invisible "
                    data-popper-placement="top"
                  >
                    Subscribe to YouTube channel
                    <div
                      className="tooltip-arrow absolute left-0 trans navbar"
                      data-popper-arrow=""
                    ></div>
                  </div>
                  <div
                    className="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-[800px]"
                    // tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header flex items-center justify-between p-4 border-b-[1px] border-solid boder-[#dadaeb]">
                      <h5
                        className="offcanvas-title mb-0 leading-normal font-semibold"
                        id="offcanvasRightLabel"
                      >
                        Updates
                      </h5>
                      <button
                        type="button"
                        className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body flex-grow p-4 overflow-y-auto ">
                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-automt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#50cd89]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [New Service] 1037 | Tiktok Likes | Max 500K |
                                Speed: 150K/Day | $0.21
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-06 00:22:15
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-auto mt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#50cd89]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [New Service] 1037 | Tiktok Likes | Max 500K |
                                Speed: 150K/Day | $0.21
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-06 00:22:15
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-automt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#f1416c]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [Disable Service] 1001 | FB Profile Followers |
                                VIET NAM | Max 100k | Speed 3k/day
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-04 13:47:09
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-automt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#50cd89]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [New Service] 1035 | Facebook Custom Comments |
                                Bình luận Facebook Việt | Speed 50-200/Day |
                                $3.5
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-04 12:41:25
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-automt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#50cd89]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [New Service] 1034 | Facebook | 𝗣𝗼𝘀𝘁/𝗣𝗵𝗼𝘁𝗼 𝗟𝗶𝗸𝗲𝘀
                                | Max 10k | Speed 3k-5k/day | $0.182
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-03 23:52:40
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative p-0 m-0 flex items-start">
                          <div className="border-b-[1px] border-solid boder-[#dadaeb] w-full overflow-automt-[-0.45rem] mb-[1rem]">
                            <div className="pr-3 mb-5 text-[#50cd89]">
                              <div className="text-[1.15rem] font-medium mb-2">
                                [New Service] 1033 | Youtube Likes | Speed
                                30k/Hours | $1.26
                              </div>
                              <div className="flex items-center mt-1 text-[1.075rem]">
                                <div className="text-[#a1a5b7] mr-2 text-[.95rem]">
                                  2022-10-03 22:56:17
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </>
        );
    }
  };
  return <>{renderHeader(type)}</>;
};

export default Header;
