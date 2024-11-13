import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { TypeHeader } from "@/types/enum";
import UserService, { isApiError } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { showErrorToast } from "@/services/toastService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Loading from "../Loading/Loading";

interface HeaderProps {
  logo: string;
  token: string | null;
  type?: TypeHeader;
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  token,
  type = TypeHeader.OTHER,
  toggleSidebar
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["userDetail", token],
    queryFn: async () => {
      try {
        // Gọi API và chỉ trả về dữ liệu `user` (lấy `data` từ `ApiResponseDetail<User>`)
        const response = await UserService.getDetail(token ?? "");
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        return response.data;
      } catch (error: unknown) {
        if (isApiError(error)) {
          if (error.status === 401) {
            showErrorToast("Invalid or expired token, please login again");
            Cookies.remove("access_token");
            router.push("/signin");
          } else {
            throw error;
          }
        } else {
          console.error("Unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
        }
      }
    },
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút
    gcTime: 1000 * 60 * 10, // Giữ cache trong 10 phút
    retry: 1, // Chỉ thử lại 1 lần nếu có lỗi
    refetchOnWindowFocus: false, // Không tự động refetch khi quay lại tab
    enabled: !!token,
  });

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

  const renderHeader = (type: TypeHeader) => {
    switch (type) {
      case TypeHeader.HOME:
        return (
          <>
            <nav
              className={
                color
                  ? "bg-white px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
                  : "bg-[#13263c] px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-[#13263c] dark:border-gray-600"
              }
            >
              <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center">
                  <Image
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
                        ? "flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white"
                        : "flex flex-col p-4 mt-4 bg-[#13263c] rounded-lg border border-[#13263c] md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[#13263c]"
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
            <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white border-b border-gray-200 dark:border-gray-600 ">
              <div className="flex justify-between items-center py-3 px-3 mx-auto w-full max-w-8xl lg:px-4 container">
                <div className="flex items-center">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (toggleSidebar)
                          toggleSidebar(); 
                      }}

                      className="lg:hidden p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105"
                    >
                      <i className="fa-solid fa-bars"></i>
                    </button>
                    <Link href="/" className="flex">
                      <Image
                        alt="Logo"
                        src={logo}
                        className="hidden lg:inline h-[70px]  object-contain"
                        height={70}
                        width={100}
                      />
                      <Image
                        alt="Logo"
                        src={logo}
                        className="lg:hidden h-[50px] w-[100px] object-contain"
                        height={50}
                        width={100}
                      ></Image>
                    </Link>
                  </div>
                </div>
                <div
                  className={`flex items-center ${access_token ? "" : "hidden"
                    }`}
                >
                  <a
                    href="/pro/#pricing"
                    className=" inline-flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3"
                  >
                    $ {user?.money?.toFixed(2)}
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
                  </div>
                </div>
              </div>
            </header>
          </>
        );
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {renderHeader(type)}
    </>
  );
};

export default Header;
