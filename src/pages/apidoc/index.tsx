import { CustomError } from "@/commons/req";
import Loading from "@/components/Loading/Loading";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import UserService, { ApiError } from "@/services/UserService";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  error: ApiError | null;
  token: string | null;
  isLayout: boolean
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

type ParameterRow = {
  param: string;
  description: string;
};
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
      isLayout: true
    },
  };
};

const Apidoc = (props: Props) => {
  const { token } = props;

  const [activeTab, setActiveTab] = useState(Tab.Service);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const ParameterTable = ({ rows }: { rows: ParameterRow[] }) => (
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
        {rows.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-gray-700">{row.param}</td>
            <td className="px-6 py-4 text-gray-700">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const ExampleResponse = ({ response }: { response: string }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <label className="text-black text-base font-semibold mb-2 block">
        Example response
      </label>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
        {response}
      </pre>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Service:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'services' },
              ]}
            />
            <ExampleResponse
              response={`[
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
]`}
            />
          </div>
        );
      case Tab.Add:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'add' },
              ]}
            />
            <ExampleResponse
              response={`{
  "order": 99999
}`}
            />
          </div>
        );
      case Tab.Status:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'status' },
                { param: 'order', description: 'Order ID' },
              ]}
            />
            <ExampleResponse
              response={`{
  "charge": "2.5",
  "start_count": "168",
  "status": "Completed",
  "remains": "-2"
}`}
            />
          </div>
        );
      case Tab.MultipleStatus:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'refill' },
                { param: 'orders', description: 'Order IDs separated by comma (E.g: 123,456,789) (Limit 100)' },
              ]}
            />
            <ExampleResponse
              response={`{
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
}`}
            />
          </div>
        );
      case Tab.CreateRefill:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'refill' },
                { param: 'order', description: 'Order ID' },
              ]}
            />
            <ExampleResponse
              response={`{
  "refill": "1"
}`}
            />
          </div>
        );
      case Tab.CreateMultipleRefill:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'refill' },
                { param: 'orders', description: 'Order IDs separated by comma (E.g: 123,456,789) (Limit 100)' },
              ]}
            />
            <ExampleResponse
              response={`{
  "refill": "1"
}`}
            />
          </div>
        );
      case Tab.RefillStatus:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'refill_status' },
                { param: 'refill', description: 'Refill ID' },
              ]}
            />
            <ExampleResponse
              response={`{
  "status": "Completed"
}`}
            />
          </div>
        );
      case Tab.Balance:
        return (
          <div className="mt-4">
            <ParameterTable
              rows={[
                { param: 'key', description: 'API Key' },
                { param: 'action', description: 'balance' },
              ]}
            />
            <ExampleResponse
              response={`{
  "balance": "68.6868",
  "currency": "USD"
}`}
            />
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
    <>
      {showLoader && <Loading />}
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-semibold text-gray-900">Api Document</h2>
      </div>

      {/* Main Section */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-custom p-6 max-w-[320px] md:max-w-full mx-auto">
          {/* API Information Section */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-6">
              <tbody>
                <tr className="border">
                  <td className="font-semibold px-4 py-2 border">API URL</td>
                  <td className="px-4 py-2 border">
                    <a
                      href="https://api.1tap.top/api/v2"
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
                        <span className="text-[#f1416c]">{displayApiKey}</span>
                        <span className="ml-2 text-gray-500">
                          <i
                            className="fa fa-refresh inline h-5 w-5 cursor-pointer"
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
                  <td className="font-semibold px-4 py-2 border">HTTP Method</td>
                  <td className="font-semibold px-4 py-2 border">POST</td>
                </tr>
                <tr className="border">
                  <td className="font-semibold px-4 py-2 border">Content-Type</td>
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
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Tabs Navigation */}
            <ul className="flex-shrink-0 flex flex-col w-full md:w-80 p-4 space-y-3 bg-gray-50 rounded-md md:rounded-l-lg">
              {[Tab.Service, Tab.Add, Tab.Status, Tab.MultipleStatus, Tab.CreateRefill, Tab.CreateMultipleRefill, Tab.RefillStatus, Tab.Balance].map((tab, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === tab ? "bg-blue-500 text-white font-semibold" : ""
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="flex-1 p-5 mt-4 md:mt-0 bg-white rounded-md shadow-sm overflow-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Apidoc;
