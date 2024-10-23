import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { TypeHearder } from "@/types/enum";
import {
  DehydratedState,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import ProductService from "@/services/ProductService";
import Table from "./__component/Table";
type Props = {
  token: string | null;
  dehydratedState: DehydratedState;
  error?: {
    status: number;
    message: string;
  };
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
      },
    };
  }

  const queryClient = new QueryClient();

  try {
    // Prefetch dữ liệu từ product service
    await queryClient.prefetchQuery({
      queryKey: ["product"],
      queryFn: ProductService.fetchProducts,
    });

    return {
      props: {
        token,
        dehydratedState: dehydrate(queryClient), // Đảm bảo có dữ liệu dehydrated
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          status: 500,
          message: "Failed to fetch data",
        },
        token: null,
        dehydratedState: dehydrate(queryClient), // Trả về empty state nếu có lỗi
      },
    };
  }
};
const Service = (props: Props) => {
  const { token } = props;
  // console.log("🚀 ~ Service ~ dehydratedState:", dehydratedState)

  // const userLogin = useSelector((state: RootState) => state.user);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        {/* <Header
          logo="/images/logo4.png"
          user={userLogin}
          type={TypeHearder.OTHE}
          token={token}
        /> */}
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              {/* <Table userLogin={userLogin} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
