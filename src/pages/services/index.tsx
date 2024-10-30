import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React from "react";
import ProductService from "@/services/ProductService";
import Table from "./__component/Table";
import UserService, { isApiError } from "@/services/UserService";
type Props = {
  token: string | null;
  dehydratedState: DehydratedState;
  error?: {
    status: number;
    message: string;
  };
  isLayout: boolean;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  // Kiểm tra token
  if (!token) {
    return {
      props: {
        error: {
          status: 401,
          message: "Unauthorized: Invalid or expired token",
        },
        token: null,
        dehydratedState: dehydrate(new QueryClient()), // Trả về empty state
        isLayout: true
      },
    };
  }

  const queryClient = new QueryClient();

  try {
    // Prefetch dữ liệu từ product service
    await queryClient.prefetchQuery({
      queryKey: ["product"],
      queryFn: async () => {
        return await ProductService.fetchProducts();
      },
    });

    return {
      props: {
        token,
        dehydratedState: dehydrate(queryClient),
        isLayout: true
      },
    };
  } catch (error: unknown) {
    if (isApiError(error)) {
      const errorCode = error.status;
      if (errorCode === 401) {
        await UserService.logout(token);
      }
      return {
        props: {
          error: {
            status: errorCode,
            message: error.data?.error || "Failed to fetch user details",
          },
          token,
          dehydratedState: dehydrate(queryClient),
          isLayout: true
        },
      };
    }
    return {
      props: {
        error: {
          status: 500,
          message: "Failed to fetch data",
        },
        token: null,
        dehydratedState: dehydrate(queryClient), // Trả về empty state nếu có lỗi
        isLayout: true
      },
    };
  }
};
const Service = (props: Props) => {
  const { token } = props;

  return (
    <>
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold text-gray-900">Services</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 p-6">
        <div className="bg-white p-6 rounded-lg shadow-custom">
          <div className="overflow-x-auto">
            <Table token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
