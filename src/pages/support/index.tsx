import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

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

const Support = (props: Props) => {
  const { token } = props;

  return (
    <div className="flex ">
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
          <h2 className="text-2xl font-bold text-gray-900">Support</h2>
        </div>

        {/* Main Section */}
        <div className="p-6">
          {/* Card Wrapper */}
          <div className="bg-white rounded-lg shadow-custom">
            {/* Card Header */}
            <div className="border-b border-gray-300 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Direct message
              </h3>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Direct Message Section */}
              <div className="grid gap-4 lg:flex lg:flex-wrap items-center border-b border-gray-300 pb-[25px] ">
                <div className="flex items-center flex-grow lg:mr-10">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                    <i className="bi bi-telegram text-blue-500 text-2xl"></i>
                  </div>
                  <div>
                    <span className="block text-gray-600 text-xs font-semibold">
                      Telegram
                    </span>
                    <span className="block text-gray-800 font-bold text-base">
                      @mrroon3y
                    </span>
                  </div>
                </div>

                <div className="flex items-center flex-grow lg:mr-10">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 mr-3">
                    <i className="bi bi-whatsapp text-green-500 text-2xl"></i>
                  </div>
                  <div>
                    <span className="block text-gray-600 text-xs font-semibold">
                      Whatsapp
                    </span>
                    <span className="block text-gray-800 font-bold text-base">
                      +84985822626
                    </span>
                  </div>
                </div>

                <div className="flex items-center flex-grow">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 mr-3">
                    <i className="bi bi-telephone text-red-500 text-2xl"></i>
                  </div>
                  <div>
                    <span className="block text-gray-600 text-xs font-semibold">
                      Phone
                    </span>
                    <span className="block text-gray-800 font-bold text-base">
                      0985822626
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <ul className="list-disc pl-5 text-gray-600 pt-3">
                <li>
                  For order issues, please chat directly with support in the
                  lower right corner of the website
                </li>
                <li>
                  For deposit issues, please contact FB:{" "}
                  <Link
                    href="https://www.facebook.com/profile.php?id=61566361872877"
                    className="text-[#009ef7]"
                  >
                    Minh Lê
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
