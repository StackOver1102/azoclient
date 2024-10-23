import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Loading from "@/components/Loading/Loading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMutationHooks } from "@/hooks/useMutationHook";

import withAuth from "@/libs/wrapAuth/warpAuth";
import UserService, {
  ApiError,
  BodyUser,
  ResponseHistoryLogin,
} from "@/services/UserService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { CustomError } from "@/commons/req";

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

  let error = null;

  return {
    props: {
      error,
      token,
    },
  };
};

const Setting = (props: Props) => {
  const { error, token } = props;

  return (
    <div className="flex">
      {/* {showLoader && <Loading />} */}
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* <Header
          logo="/images/logo4.png"
          user={userLogin}
          token={token}
          type={TypeHearder.OTHE}
        /> */}

        {/* Settings Title */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        </div>

        {/* Security Settings Section */}
        <div className="p-6">
          {/* Card Wrapper */}
          <div className="bg-white rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
