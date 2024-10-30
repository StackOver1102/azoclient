import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import UserService from "@/services/UserService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

type Props = {
  isLogin: boolean;
  token: string | null;
  isOpen: boolean;
  toggleSidebar: () => void;
};
const Sidebar = (props: Props) => {
  const { isLogin, token, isOpen, toggleSidebar } = props;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await UserService.logout(token!);
      Cookies.remove("access_token");
      router.push("/");
    } catch (error) {
      router.push("/");
      console.log("🚀 ~ handleLogout ~ error:", error);
    }
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      toggleSidebar();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Lắng nghe sự kiện mousedown
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); 
    }

    // Cleanup sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, [isOpen]);


  useEffect(() => {
    if (isOpen) toggleSidebar(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);
  return (
    <>

      {/* Overlay layer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}

      <aside
        id="sidebar"
        ref={sidebarRef}
        className={`fixed top-[75px] lg:top-[94px] left-0 z-40 w-64 h-[calc(100vh-72px)] pt-8 border-r border-gray-200 dark:border-gray-600 flex flex-col justify-between bg-purple-700 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:overflow-y-visible overflow-y-auto`}
        aria-label="Sidebar"
      >
        {/* Sidebar links and logo */}
        <div className="flex-grow">
          <div className=" justify-center mb-6 hidden lg:flex">
            <Image
              alt="Logo"
              src={"/images/logo4.png"}
              className="h-[150px]"
              height={100}
              width={196}
            />
          </div>
          <div className="h-full px-3 pb-4 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/new"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-cart-shopping text-lg text-white"></i>
                  <span className="text-xl">New Order</span>
                </Link>
              </li>
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/mass"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-user text-lg text-white"></i>
                  <span className="text-xl">Mass Order</span>
                </Link>
              </li>
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/orders"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-cog text-lg text-white"></i>
                  <span className="text-xl">My Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-list text-lg text-white"></i>
                  <span className="text-xl">Services</span>
                </Link>
              </li>
              {/* <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/refill"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-sync text-lg text-white"></i>
                  <span className="text-xl">Refill</span>
                </Link>
              </li> */}
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/addfunds"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-money-bill-wave text-lg text-white"></i>
                  <span className="text-xl">Add Funds</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-headset text-lg text-white"></i>
                  <span className="text-xl">Support</span>
                </Link>
              </li>
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/settings"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-sliders text-lg text-white"></i>
                  <span className="text-xl">Settings</span>
                </Link>
              </li>
              <li className={`${isLogin ? "" : "hidden"}`}>
                <Link
                  href="/cashflow"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-chart-line text-lg text-white"></i>
                  <span className="text-xl">Cash Flow</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/apidoc"
                  className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  <i className="fa-solid fa-file-code text-lg text-white"></i>
                  <span className="text-xl">API</span>
                </Link>
              </li>
              {isLogin && (
                <li>
                  <a
                    onClick={handleLogout}
                    className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                  >
                    <i className="fa-solid fa-right-to-bracket text-lg text-white"></i>
                    <span className="text-xl">Log out</span>
                  </a>
                </li>
              )}

              {!isLogin && (
                <>
                  <li>
                    <Link
                      href="/signin"
                      className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                    >
                      <i className="fa-solid fa-right-to-bracket text-lg text-white"></i>
                      <span className="text-xl">Sign in</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="flex items-center dark:text-white space-x-2 p-2 text-base font-normal text-white rounded-lg hover:bg-purple-600 transition duration-200"
                    >
                      <i className="fa-solid fa-right-to-bracket text-lg text-white"></i>
                      <span className="text-xl">Sign up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
