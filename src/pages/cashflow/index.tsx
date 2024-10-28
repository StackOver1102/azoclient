import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { showErrorToast } from "@/services/toastService";
import UserService, { ApiError, isApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pagination from "@/components/Pagination/Pagination";
import withAuth from "@/libs/wrapAuth/warpAuth";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import CashFlowService, { TypeHistory } from "@/services/CashFlowService";
import type { CashFlow } from "@/services/CashFlowService";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import dayjs from "dayjs";

type Props = {
  error: ApiError | null;
  token: string | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;
  const queryClient = new QueryClient();

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

  try {
    // await queryClient.prefetchQuery({
    //   queryKey: ["cashflows", token],
    //   queryFn: async () => {
    //     try {
    //       const response = await CashFlowService.getCashFlow(token);
    //       if (!response || !response.data) {
    //         throw new Error("No data returned from API");
    //       }
    //       return response.data;
    //     } catch (error) {
    //       throw error;
    //     }
    //   },
    // });

    return {
      props: {
        error: null,
        token,
        dehydratedState: dehydrate(queryClient), // Pass dehydrate state to hydrate client side
      },
    };
  } catch (err: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    if (isApiError(err)) {
      const errorCode = err.status;
      if (errorCode === 401) {
        await UserService.logout(token);
      }
      return {
        props: {
          error: {
            status: errorCode,
            message: err.data?.error || "Failed to fetch user details",
          },
          token,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
    return {
      props: {
        error: {
          status: 500,
          message: err.message || "Failed to fetch user details",
        },
        token,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

const splitIntoChunks = (array: CashFlow[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const CashFlow = (props: Props) => {
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

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["cashflows", token],
    queryFn: async () => {
      try {
        const response = await CashFlowService.getCashFlow(token!);
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

  const itemsPerPage = 80; // 80 items per page
  const itemsPerColumn = 20; // 20 items per column
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filterVisible, setFilterVisible] = useState(false); // Track filter panel visibility
  const [orderID, setOrderID] = useState(""); // Track order ID input
  const [filteredData, setFilteredData] = useState<CashFlow[]>(data ?? []); // Track filtered data
  const [columnChunks, setColumnChunks] = useState<CashFlow[][]>([]); // Track chunked columns
  const [isFiltered, setIsFiltered] = useState(false); // Track if the data is filtered
  const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Calculate total pages

  // Calculate paginatedData and update columnChunks whenever filteredData or currentPage changes
  useEffect(() => {
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const chunks = splitIntoChunks(paginatedData, itemsPerColumn);
    setColumnChunks(chunks);
  }, [filteredData, currentPage]);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Apply Filter
  const handleApplyFilter = () => {
    // Filter data based on the Order ID entered
    if (orderID) {
      const filtered = data.filter((item) => item.title.includes(orderID));
      setFilteredData(filtered);
      setIsFiltered(true); // Set filtered flag to true
    } else {
      setFilteredData(data); // Reset to original data if no order ID is entered
      setIsFiltered(false); // Set filtered flag to false
    }
    setFilterVisible(false); // Hide filter after applying
    setCurrentPage(1); // Reset pagination to the first page
  };

  // Reset Filter
  const handleResetFilter = () => {
    setOrderID(""); // Clear input field
    setFilteredData(data); // Reset to original data
    setIsFiltered(false); // Set filtered flag to false
    setCurrentPage(1); // Reset pagination to the first page
  };

  return (
    <div className="flex text-sm">
      {/* Sidebar */}
      <Sidebar isLogin={token ? true : false} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 bg-[#f9fafb] min-h-screen">
        {/* Header */}
        <Header
          logo="/images/logo4.png"
          token={token}
          type={TypeHearder.OTHE}
        />
        {isLoading && <Loading />}
        {/* Title and Filter */}
        <div className="flex justify-between items-center px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Cash Flow</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <span>🔍</span> Filter
          </button>
        </div>

        {/* Filter Panel */}
        {filterVisible && (
          <div className="bg-white rounded-lg shadow-custom p-4 mt-4 w-80 absolute right-6 z-10">
            <h3 className="text-lg font-semibold text-gray-700">
              Filter Options
            </h3>
            <div className="mt-4">
              <label className="block text-gray-600">Order ID:</label>
              <input
                type="text"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded bg-gray-100"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleResetFilter}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilter}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Main Section */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {/* Conditional rendering for empty results */}
            {isFiltered && filteredData.length === 0 ? (
              <p className="text-center text-gray-500">
                No results found for &quot;{orderID}&quot;
              </p>
            ) : (
              <div className="flex flex-wrap">
                {columnChunks.map((chunk, columnIndex) => (
                  <div key={columnIndex} className="w-1/4 p-4">
                    {chunk.map((item, idx) => (
                      <div key={idx} className="flex justify-between mb-2">
                        {/* Conditional rendering for DEPOSIT */}
                        {item.type === TypeHistory.addMoney ? (
                          <div className="flex items-start">
                            {/* Blue vertical line */}
                            <div className="h-full w-1 bg-blue-500 mr-2"></div>
                            <div>
                              <p className="font-semibold">
                                {item.description}
                              </p>
                              <p className="text-gray-500">
                                {dayjs(new Date(item.createdAt)).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Link
                              href={`/cashflow/${item._id}`}
                              className="font-semibold hover:text-[#009ef7]"
                            >
                              {item.description}
                            </Link>
                            <p className="text-gray-500">
                              {" "}
                              {dayjs(new Date(item.createdAt)).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </p>
                          </div>
                        )}

                        {/* Value handling, blue for DEPOSIT, otherwise conditional red/blue */}
                        <div>
                          <div>
                            <p
                              className={
                                item.type === TypeHistory.addMoney
                                  ? "text-blue-500 font-bold text-right"
                                  : "text-red-500 text-right"
                              }
                            >
                              {`${
                                item.type === TypeHistory.addMoney ? "+" : "-"
                              }${item.amount.toFixed(5)}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#A1A5B7] text-[12px] text-right font-semibold ">
                              10.517038704
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CashFlow);
