import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  error: ApiError | null;
  token: string | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;
  const id = context.params?.id
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

  

  let error = null;

  return {
    props: {
      error,
      token,
    },
  };
};

const ClashFlow = (props: Props) => {
  const { error, token } = props;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 bg-[#f9fafb] min-h-screen">
        {/* Header */}
        <Header
          logo="/images/logo4.png"
          token={token}
          type={TypeHearder.OTHE}
        />

        <div className="flex justify-between items-center px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Cash Flow</h2>
        </div>

        {/* Main Section */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ClashFlow;
