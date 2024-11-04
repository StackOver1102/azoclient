import CustomImage from "@/components/Image/Image";
import { showErrorToast } from "@/services/toastService";
import UserService, { ApiError, isApiError } from "@/services/UserService";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import withAuth from "@/libs/wrapAuth/warpAuth";
import Image from "next/image";
import DateRangePickerComponent from "@/components/DatePick/DateRangePickerComponent";
import CountUpDisplay from "@/components/Counter/CountUpDisplay";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useUserDetail } from "@/hooks/fetch/useUserDetail";
import SelectDropdown from "@/components/Select/Select";
import PerfectMoneyPayment from "@/components/Addfunds/PerfectMoney/PerfectMoney";
import depositFetch from "@/hooks/fetch/deposit";
import { PayPalButton } from "@/components/Addfunds/Paypal/Paypal";
import Loading from "@/components/Loading/Loading";
import InvoiceService from "@/services/InvoiceService";
import Cryptocurrency from "@/components/Addfunds/Cryptocurrency/Cryptocurrency";

type Props = {
  error: ApiError | null;
  token: string | null;
  isLayout: boolean;
};

export interface DataForm {
  API_URL: string;
  PAYMENT_ID: string;
  PAYEE_NAME: string;
  PAYEE_ACCOUNT: string;
  PAYMENT_UNITS: string;
  PAYMENT_URL: string;
  NOPAYMENT_URL: string;
  STATUS_URL: string;
  SUGGESTED_MEMO: string;
}

const MethodPay = ["Perfect Money", "Cryptocurrency", "Paypal"];

enum ConvertMethod {
  "Perfect Money" = "perfect_money",
  "Cryptocurrency" = "cryptocurrency",
  "Paypal" = "paypal"
}
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;
  const queryClient = new QueryClient();
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: ["historyPayment", token],
      queryFn: async () => {
        try {
          const response = await InvoiceService.getHistory(token);
          if (!response || !response.data) {
            throw new Error("No data returned from API");
          }
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    });

    return {
      props: {
        error: null,
        token,
        dehydratedState: dehydrate(queryClient),
        isLayout: true,
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
          isLayout: true,
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
        isLayout: true,
      },
    };
  }
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

  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["historyPayment", token],
    queryFn: async () => {
      try {
        // Gọi API và chỉ trả về dữ liệu `user` (lấy `data` từ `ApiResponseDetail<User>`)
        const response = await InvoiceService.getHistory(token!);
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

  const { data: user } = useUserDetail(token!);

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredTransactions, setFilteredTransactions] = useState(data ?? []);
  const [selectedMethod, setMethodPay] = useState<string | null>(MethodPay[0]);
  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  const methodKey =
    (selectedMethod as keyof typeof ConvertMethod) ?? "Perfect Money";

  const { data: dataDesposit, isLoading, isError, error: errorCallApi } = depositFetch(
    ConvertMethod[methodKey],
    token
  );

  useEffect(() => {
    if (isError && errorCallApi) {
      console.error("Lỗi khi gọi API:", errorCallApi);

      if (isApiError(errorCallApi)) {
        if (errorCallApi.status === 401) {
          showErrorToast(
            "Unauthorized: Invalid or expired token, please login again"
          );
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
  }, [isError, errorCallApi])

  const [activeTab, setActiveTab] = useState("addFunds");

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMethodChange = (selectedType: string | null) => {
    setMethodPay(selectedType);
  };

  useEffect(() => {
    let filtered = data ?? [];

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      startDate.setHours(0, 0, 0, 0); // Đặt giờ bắt đầu

      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Đặt giờ kết thúc để bao gồm toàn bộ ngày kết thúc

      filtered = filtered?.filter((item) => {
        const createdAt = new Date(item.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }

    setFilteredTransactions(filtered);
  }, [dateRange, data]);

  const genareteMethod = (method: string) => {
    switch (method) {
      case MethodPay[0]:
        return <PerfectMoneyPayment data={(dataDesposit?.data as DataForm) ?? {}} />;
      case MethodPay[2]:
        return <PayPalButton data={(dataDesposit?.data as DataForm) ?? {}} userId={user?._id}  token={token!}/>;
      case MethodPay[1]:
        return <Cryptocurrency token={token} />;
      default:
        return null;
    }
  }
  return (
    <>
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold text-gray-900">Add funds</h2>
      </div>
      {isLoading && <Loading />}
      {/* Main Section */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-custom p-6">
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
            <CustomImage
              src="/images/300-3.jpg"
              alt="Profile"
              className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] rounded-full mb-4 sm:mb-0 sm:mr-4"
              width={160}
              height={160}
            />
            <div className="flex flex-col sm:flex-grow items-center sm:items-start text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <span className="text-lg sm:text-xl font-bold text-gray-800 mr-2">
                  {user?.email || "username"}
                </span>
                <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  RESELLER
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-4 sm:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 10.882l7.997-4.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 5-8-5V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{user?.email || "user@example.com"}</span>
              </div>

              <div className="flex justify-center sm:justify-start space-x-4 mt-4 sm:mt-2">
                <div className="text-center">
                  <CountUpDisplay end={user?.money ?? 0} />
                </div>
                <div className="text-center">
                  <CountUpDisplay end={0} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => handleTabSwitch("addFunds")}
              className={`px-4 py-2 font-bold ${activeTab === "addFunds"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
                }`}
            >
              Add funds
            </button>
            <button
              onClick={() => handleTabSwitch("history")}
              className={`px-4 py-2 font-bold ${activeTab === "history"
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
                <SelectDropdown
                  badge={false}
                  data={MethodPay}
                  image={false}
                  onSelect={handleMethodChange}
                  defaultValue={selectedMethod ?? ""}
                  defaultLabel={selectedMethod ?? ""}
                />
              </div>
              {genareteMethod(selectedMethod ?? "")}
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Filter
                </label>
                <div className="w-full">
                  <DateRangePickerComponent
                    start={dateRange.start}
                    end={dateRange.end}
                    onDateChange={handleDateChange}
                  />
                </div>
              </div>

              {/* History Section with Responsive Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                        Method
                      </th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                        Details
                      </th>
                      <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-4 py-2 text-sm text-gray-700 flex items-center space-x-2">
                            <Image
                              src="/images/bank.png"
                              alt="Bank icon"
                              className="h-6 w-6"
                              width={24}
                              height={24}
                            />
                            <span>{transaction.type}</span>
                          </td>
                          <td className="px-4 py-2 text-blue-500 text-sm font-bold">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {dayjs(new Date(transaction.createdAt)).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          No transaction history available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(AddFunds);
