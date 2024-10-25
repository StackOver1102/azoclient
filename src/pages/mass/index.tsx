import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  ApiError,

} from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import React from "react";


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

const MassOrder = (props: Props) => {
  const { error, token } = props;

  return (
    <div className="flex ">
      {/* Sidebar (adjust or import as needed) */}
      <Sidebar />

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
              placeholder={`service_id | link | quantity\nservice_id | link | quantity | comment1 / comment2 / comment3 / ... (Separate by /)\nservice_id | link | quantity | suggest video list\nservice_id | link | quantity | keyword search\nservice_id | link | quantity | suggest video list | keyword search (Mix views)`}
            ></textarea>
            {/* Submit Button */}
            <div className="mt-6">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassOrder;
