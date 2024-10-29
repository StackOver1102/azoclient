import { CustomError } from "@/commons/req";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMutationHooks } from "@/hooks/useMutationHook";
import OrderService from "@/services/OrderService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/Loading/Loading";
import withAuth from "@/libs/wrapAuth/warpAuth";
import { useQueryClient } from "@tanstack/react-query";

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

const MassOrder = (props: Props) => {
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
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [orderText, setOrderText] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutationHooks(
    async ({ orderText, token }: { orderText: string; token: string }) => {
      try {
        return await OrderService.createMassOrder(orderText, token);
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
        queryClient.refetchQueries({ queryKey: ["cashflows", token] });
        queryClient.invalidateQueries({ queryKey: ["userDetail", token] });
        queryClient.invalidateQueries({ queryKey: ["orders", token] });
        showSuccessToast("Create order successful");
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

    // Validate form
    if (!orderText) {
      showErrorToast("Please fill in both fields.");
      return;
    }

    try {
      if (!token) return;
      await mutation.mutateAsync({ orderText, token });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      // showErrorToast(`Login failed: ${error.message}`);
    }
  };
  return (
    <div className="flex ">
      {showLoader && <Loading />}
      {/* Sidebar (adjust or import as needed) */}
      <Sidebar isLogin={token ? true : false} token={token} />

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
          <h2 className="text-2xl font-bold text-gray-900">Mass order</h2>
        </div>

        {/* Main Section */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {/* Form Section */}
            <label>One order per line in format</label>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-md"
              onChange={(e) => setOrderText(e.target.value)}
              placeholder={`service_id | link | quantity\nservice_id | link | quantity | comment1 / comment2 / comment3 / ... (Separate by /)\nservice_id | link | quantity | suggest video list\nservice_id | link | quantity | keyword search\nservice_id | link | quantity | suggest video list | keyword search (Mix views)`}
            ></textarea>
            {/* Submit Button */}
            <div className="mt-6">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MassOrder);
