import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { showErrorToast } from "@/services/toastService";
import { ApiError, isApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import OrderService from "@/services/OrderService";
import { useQuery } from "@tanstack/react-query";
import withAuth from "@/libs/wrapAuth/warpAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

const Refill = (props: Props) => {
  const { error, token } = props;
  const router = useRouter();

  useEffect(() => {
    if (!token || error?.status === 401) {
      // Show error toast message and redirect
      showErrorToast(
        "Unauthorized: Invalid or expired token, please login again"
      );
      Cookies.remove("access_token");
      router.push("/signin");
    }
  }, [token, error, router]);

  const { data: orders } = useQuery({
    queryKey: ["userDetail", token],
    queryFn: async () => {
      try {
        const response = await OrderService.getAllOrder(token!);
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return (
    <div className="flex">
      <Sidebar isLogin={!!token} />
      <div className="flex-1 lg:ml-64 bg-[#f9fafb]">
        <Header
          logo="/images/logo4.png"
          token={token}
          type={TypeHearder.OTHE}
        />

        {/* New Order Heading */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">Refill</h2>
        </div>

        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-custom">
            {/* Filter and Search Section */}
            <div className="flex space-x-4 mb-4">
              {/* Filter Dropdown 1 */}
              <div className="relative w-1/4">
                <select className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg leading-tight focus:outline-none focus:ring-blue-500">
                  <option>All</option>
                  {/* Add other filter options as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
              {/* Filter Dropdown 2 */}
              <div className="relative w-1/4">
                <select className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg leading-tight focus:outline-none focus:ring-blue-500">
                  <option>Search type</option>
                  {/* Add other search types as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
              {/* Search Bar */}
              {/* <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-blue-500"
                />
                <button className="absolute inset-y-0 right-0 px-4 bg-blue-500 rounded-r-lg flex items-center">
                  <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 21l-4.35-4.35a8 8 0 111.415-1.414L21 21zM10 16a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
                </button>
              </div> */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full rounded-lg leading-tight focus:outline-none focus:ring-blue-500"
                  placeholder="Search"
                />
                <button className="absolute inset-y-0 right-0 bg-blue-500 px-3 flex items-center justify-center rounded-r text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-2 font-medium text-gray-500">#</th>
                    <th className="px-4 py-2 font-medium text-gray-500">
                      Order ID
                    </th>
                    <th className="px-4 py-2 font-medium text-gray-500">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">1</td>
                        <td className="px-4 py-2">2</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-2 text-center text-gray-500"
                      >
                        No refill found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Refill);
