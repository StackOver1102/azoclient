import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { showErrorToast } from "@/services/toastService";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pagination from "@/components/Pagination/Pagination";
import withAuth from "@/libs/wrapAuth/warpAuth";

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

  return {
    props: {
      error: null,
      token,
    },
  };
};

const splitIntoChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const ClashFlow = (props: Props) => {
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
  const data = [
    {
      id: 1,
      title: "Partial - 2222",
      timestamp: "2024-10-23 12:42:47",
      value: 0.04848,
      order: "Add order - 19822995",
      change: -0.0372,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - 19828997",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "DEPOSIT",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - 19755696",
      change: -0.0288,
    },
    {
      title: "Add order - abc",
      timestamp: "2024-10-23 12:00:19",
      value: -0.0192,
      order: "Add order - abc",
      change: -0.0288,
    },
    // Add more rows here...
  ];

  const itemsPerPage = 80; // 80 items per page
  const itemsPerColumn = 20; // 20 items per column
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filterVisible, setFilterVisible] = useState(false); // Track filter panel visibility
  const [orderID, setOrderID] = useState(""); // Track order ID input
  const [filteredData, setFilteredData] = useState(data); // Track filtered data
  const [columnChunks, setColumnChunks] = useState([]); // Track chunked columns
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
    <div className="flex">
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
                        {item.title.includes("DEPOSIT") ? (
                          <div className="flex items-start">
                            {/* Blue vertical line */}
                            <div className="h-full w-1 bg-blue-500 mr-2"></div>
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p className="text-gray-500">{item.timestamp}</p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Link
                              href={`/cashflow/${item.id}`}
                              className="font-semibold hover:text-[#009ef7]"
                            >
                              {item.title}
                            </Link>
                            <p className="text-gray-500">{item.timestamp}</p>
                          </div>
                        )}

                        {/* Value handling, blue for DEPOSIT, otherwise conditional red/blue */}
                        <div>
                          <p
                            className={
                              item.title.includes("DEPOSIT")
                                ? "text-blue-500 font-bold"
                                : item.value > 0
                                ? "text-blue-500"
                                : "text-red-500"
                            }
                          >
                            {item.value.toFixed(5)}
                          </p>
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

export default withAuth(ClashFlow);
