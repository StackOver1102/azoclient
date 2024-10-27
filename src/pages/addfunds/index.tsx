import Header from "@/components/Header/Header";
import CustomImage from "@/components/Image/Image";
import Sidebar from "@/components/Sidebar/Sidebar";
import { showErrorToast } from "@/services/toastService";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Cookies from "js-cookie";
import withAuth from "@/libs/wrapAuth/warpAuth";

type Props = {
  error: ApiError | null;
  token: string | null;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  if (!token) {
    return {
      props: {
        error: {
          status: 401,
          message: "Unauthorized: Invalid or expired token",
        },
        token: null,
      },
    };
  }

  return {
    props: {
      error: null,
      token,
    },
  };
};

const AddFunds = (props: Props) => {
  const { error, token } = props;
  useEffect(() => {
    if (!token || error?.status === 401) {
      // Show error toast message and redirect
      showErrorToast(
        "Unauthorized: Invalid or expired token, please login again"
      );
      Cookies.remove("access_token");
    }
  }, [token, error]);

  const [activeTab, setActiveTab] = useState("addFunds");

  // Function to handle tab switching
  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar (adjust or import as needed) */}
      <Sidebar isLogin={token ? true : false} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 bg-[#f9fafb]">
        {/* Header (you can customize the header as per your requirements) */}
        <Header
          logo="/images/logo4.png"
          token={token} // Assuming 'token' is passed as a prop or retrieved
          type={TypeHearder.OTHE} // Adjust this as needed
        />

        {/* Title */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">Add funds</h2>
        </div>

        {/* Main Section */}

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {/* Profile Section */}
            <div className="flex items-center mb-6">
              {/* <img
                src="/images/avatar.png"
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              /> */}
              <CustomImage
                src="/images/300-3.jpg"
                alt="Profile"
                className="w-[160px] h-[160px] rounded-full mr-4"
                width={160}
                height={160}
              />
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 mr-2">
                    lucasleet9
                  </span>
                  <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded">
                    RESELLER
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  lucasleet9@gmail.com
                </span>
                <div className="ml-auto flex space-x-4">
                  <div className="text-center border border-dashed border-gray-300 rounded min-w-[125px] px-4 me-6 mb-3">
                    <div className="flex items-center">
                      <span className="svg-icon svg-icon-3 svg-icon-success ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            opacity="0.5"
                            x="13"
                            y="6"
                            width="13"
                            height="2"
                            rx="1"
                            transform="rotate(90 13 6)"
                            fill="currentColor"
                          ></rect>
                          <path
                            d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <span className="block text-green-500 font-bold text-xl">
                        $
                        <CountUp
                          start={0}
                          end={2162}
                          className="min-w-[70px]"
                          formattingFn={(num) => num.toLocaleString()}
                        />
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">Deposit</span>
                  </div>
                  <div className="text-center  border border-dashed border-gray-300 rounded min-w-[125px] px-4 me-6 mb-3">
                    {/* <span className="block text-yellow-500 font-bold text-xl">
                      $0
                    </span> */}
                    <div className="flex items-center">
                      <span className="svg-icon svg-icon-3 svg-icon-success ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            opacity="0.5"
                            x="13"
                            y="6"
                            width="13"
                            height="2"
                            rx="1"
                            transform="rotate(90 13 6)"
                            fill="currentColor"
                          ></rect>
                          <path
                            d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <span className="block text-yellow-500 font-bold text-xl">
                        $
                        <CountUp
                          start={0}
                          end={2162}
                          className="min-w-[70px]"
                          formattingFn={(num) => num.toLocaleString()}
                        />
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">Deposit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => handleTabSwitch("addFunds")}
                className={`px-4 py-2 font-bold ${
                  activeTab === "addFunds"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                Add funds
              </button>
              <button
                onClick={() => handleTabSwitch("history")}
                className={`px-4 py-2 font-bold ${
                  activeTab === "history"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                History
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {activeTab === "addFunds" ? (
              <div>
                {/* Form Section */}
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Choose method <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select method</option>
                    {/* Add options dynamically */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548a.596.596 0 0 1 .937 0L10 11.634l3.547-4.086a.596.596 0 1 1 .937.766l-4 4.602a.596.596 0 0 1-.937 0l-4-4.602a.596.596 0 0 1 0-.766z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* History Section */}
                <p className="text-gray-600">
                  You have no transaction history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AddFunds);
