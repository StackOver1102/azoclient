import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState } from "@/libs/redux/store";
import { TypeHearder } from "@/types/enum";
import {
  DehydratedState,
  HydrationBoundary,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React from "react";
import { useSelector } from "react-redux";
import ProductService from "@/services/ProductService";
import { getQueryClient } from "@/utils/queryClient";
import Table from "./__component/Table";
export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: ProductService.fetchProducts,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const Service = ({ dehydratedState }: { dehydratedState: DehydratedState }) => {
  // console.log("🚀 ~ Service ~ dehydratedState:", dehydratedState)

  const userLogin = useSelector((state: RootState) => state.user);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {" "}
        {/* Apply margin only on large screens (lg) */}
        <Header
          logo="/images/logo4.png"
          userInfo={userLogin}
          type={TypeHearder.OTHE}
        />
        {/* Two-column layout for the content with 70-30 split */}
        <div className="grid grid-cols-1 gap-4 p-6">
          {/* Left Column (70%) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <HydrationBoundary state={dehydratedState}>
                <Table userLogin={userLogin} />
              </HydrationBoundary>
            </div>
          </div>

          {/* Right Column (30%) */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <div>
              <p>
                Content or information for the right column (30%) goes here.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Service;
