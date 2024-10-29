import { CustomError } from "@/commons/req";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import UserService, { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "@/components/Loading/Loading";

type Props = {
  error: ApiError | null;
  token: string | null;
};

enum Tab {
  Service = "Services",
  Add = "Add order",
  Status = "Order status",
  MultipleStatus = "Multiple orders status",
  CreateRefill = "Create refill",
  CreateMultipleRefill = "Create multiple refill",
  RefillStatus = "Refill status",
  Balance = "Balance",
}
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

    if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
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

const Apidoc = (props: Props) => {
  const { token } = props;

  const [activeTab, setActiveTab] = useState(Tab.Service);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const renderContent = () => {
    switch (activeTab) {
      case Tab.Service:
        return (
          <div className="mt-4">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">services</td>
                </tr>
              </tbody>
            </table>
            <label>Example response</label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`[
    {
        "service": 1,
        "name": "Youtube views",
        "type": "Default",
        "category": "Youtube",
        "rate": "2.5",
        "min": "200",
        "max": "10000",
        "refill": true
    }
]`}</pre>
            </div>
          </div>
        );
      case Tab.Add:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">add</td>
                </tr>
              </tbody>
            </table>

            <label>Example response</label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "order": 99999
}`}</pre>
            </div>
          </div>
        );
      case Tab.Status:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">status</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">order</td>
                  <td className="px-6 py-4 text-gray-700">Order ID</td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "charge": "2.5",
    "start_count": "168",
    "status": "Completed",
    "remains": "-2"
}`}</pre>
            </div>
          </div>
        );
      case Tab.MultipleStatus:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">refill</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">orders</td>
                  <td className="px-6 py-4 text-gray-700">
                    Order IDs separated by comma (E.g: 123,456,789) (Limit
                    &quot;100&quot;)
                  </td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "123": {
        "charge": "0.27819",
        "start_count": "3572",
        "status": "Partial",
        "remains": "157"
    },
    "456": {
        "error": "Incorrect order ID"
    },
    "789": {
        "charge": "1.44219",
        "start_count": "234",
        "status": "In progress",
        "remains": "10"
    }
}`}</pre>
            </div>
          </div>
        );
      case Tab.CreateRefill:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">refill</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">order</td>
                  <td className="px-6 py-4 text-gray-700">Order ID</td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "refill": "1"
}`}</pre>
            </div>
          </div>
        );
      case Tab.CreateMultipleRefill:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">refill</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">orders</td>
                  <td className="px-6 py-4 text-gray-700">
                    Order IDs separated by comma (E.g: 123,456,789) (Limit 100)
                  </td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "refill": "1"
}`}</pre>
            </div>
          </div>
        );
      case Tab.RefillStatus:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">refill_status</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">refill</td>
                  <td className="px-6 py-4 text-gray-700">Refill ID</td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "status": "Completed"
}`}</pre>
            </div>
          </div>
        );
      case Tab.Balance:
        return (
          <div className="mt-4 mr-4 ">
            <table className="table-auto w-full text-left border-collapse mb-6 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Parameters
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-800 border-b-2 border-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">key</td>
                  <td className="px-6 py-4 text-gray-700">API Key</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">action</td>
                  <td className="px-6 py-4 text-gray-700">balance</td>
                </tr>
              </tbody>
            </table>
            <label className="text-black text-base font-semibold">
              Example response
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <pre className="text-sm text-gray-700">{`{
    "balance": "68.6868",
    "currency": "USD"
}`}</pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const router = useRouter();
  const mutation = useMutationHooks(
    async ({ token }: { token: string }) => {
      try {
        return await UserService.changeApikey(token);
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: () => {
        setShowLoader(false);
        showSuccessToast("Change api key successful");
      },
      onError: (error: CustomError) => {
        if (error.status) {
          const statusCode = error.status;
          const message = error.data.error;
          if (statusCode === 400) {
            showErrorToast(`${message}.`);
          } else if (statusCode === 401) {
            showErrorToast("Unauthorized: You need to log in again.");
            // persistor.purge();
            router.push("/signin");
          } else if (statusCode === 500) {
            showErrorToast("The server is busy, please try again later.");
          } else {
            showErrorToast(
              `An error occurred: ${error.message || "Unknown error"}`
            );
          }
        } else {
          showErrorToast("The server is busy, please try again later.");
        }
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        await mutation.mutateAsync({ token });
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        // showErrorToast(`Login failed: ${error.message}`);
      }
    }
  };

  const { data } = mutation;
  const apiKey = data?.data;

  const displayApiKey = apiKey ? `${apiKey}` : "a4da3*********";

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isLogin={token ? true : false} token={token}/>

      {showLoader && <Loading />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 bg-[#f9fafb] min-h-screen">
        {/* Header */}
        <Header
          logo="/images/logo4.png"
          token={token}
          type={TypeHearder.OTHE}
        />

        {/* Title */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Api Document</h2>
        </div>

        {/* Main Section */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {/* API Information Section */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full mb-6">
                <tbody>
                  <tr className="border">
                    <td className="font-semibold px-4 py-2 border">API URL</td>
                    <td className="px-4 py-2 border">
                      <a
                        href="https://1dg.me/api/v2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        https://api.1tap.top/api/v2
                      </a>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="font-semibold px-4 py-2 border">API Key</td>
                    <td className="font-semibold px-4 py-2 border">
                      {token ? (
                        <>
                          <span className="text-[#f1416c]">
                            {displayApiKey}
                          </span>
                          <span className="ml-2 text-gray-500">
                            <i
                              className="fa fa-refresh inline h-5 w-5 hover:cursor-pointer"
                              onClick={handleSubmit}
                            ></i>
                          </span>
                        </>
                      ) : (
                        <span>
                          <Link href="/signup" className="text-[#009ef7]">
                            Sign up
                          </Link>{" "}
                          or{" "}
                          <Link href="/signin" className="text-[#009ef7]">
                            Sign in
                          </Link>{" "}
                          now to get key
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="font-semibold px-4 py-2 border">
                      HTTP Method
                    </td>
                    <td className="font-semibold px-4 py-2 border">
                      <span>POST</span>
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="font-semibold px-4 py-2 border">
                      Content-Type
                    </td>
                    <td className="font-semibold px-4 py-2 border">
                      application/x-www-form-urlencoded
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="font-semibold px-4 py-2 border">Response</td>
                    <td className="font-semibold px-4 py-2 border">JSON</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Parameters and Example Response Section */}
            <div className="flex flex-col md:flex-row ">
              {/* Tabs navigation */}
              <ul className="flex flex-col md:w-80 p-4 rounded-l-lg space-y-3">
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.Service
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.Service)}
                >
                  {Tab.Service}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.Add
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.Add)}
                >
                  {Tab.Add}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.Status
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.Status)}
                >
                  {Tab.Status}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.MultipleStatus
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.MultipleStatus)}
                >
                  {Tab.MultipleStatus}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.CreateRefill
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.CreateRefill)}
                >
                  {Tab.CreateRefill}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.CreateMultipleRefill
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.CreateMultipleRefill)}
                >
                  {Tab.CreateMultipleRefill}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.RefillStatus
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.RefillStatus)}
                >
                  {Tab.RefillStatus}
                </li>
                <li
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    activeTab === Tab.Balance
                      ? "bg-blue-500 text-white font-semibold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(Tab.Balance)}
                >
                  {Tab.Balance}
                </li>
              </ul>

              {/* Tab content */}
              <div className="flex-1 p-5 mb-5 overflow-auto">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apidoc;
