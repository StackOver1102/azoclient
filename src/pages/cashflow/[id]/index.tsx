import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ApiError } from "@/services/UserService";
import { TypeHeader } from "@/types/enum";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import moment from "moment";

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

const ClashFlow = (props: Props) => {
  const { token } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Example transaction data
  const transactions = [
    {
      type: "Canceled",
      orderId: "20016330",
      amount: 0.0869952,
      date: "2024-10-28 23:03:20",
      color: "text-blue-500",
    },
    {
      type: "Add order",
      orderId: "20016330",
      amount: -0.0869952,
      date: "2024-10-28 22:45:19",
      color: "text-red-500",
    },
  ];

  // Calculate total change
  const totalChange = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isLogin={!!token} token={token} toggleSidebar={toggleSidebar} isOpen/>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 bg-[#f9fafb] min-h-screen">
        {/* Header */}
        <Header logo="/images/logo4.png" token={token} type={TypeHeader.OTHER} toggleSidebar={toggleSidebar}/>

        <div className="flex justify-between items-center px-6 pt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Cash Flow</h2>
        </div>

        {/* Main Section */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-custom p-6">
            {/* Transaction List */}
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{transaction.type}</span> -{" "}
                    <span className="text-gray-500">{transaction.orderId}</span>
                    <div className="text-sm text-gray-400">
                      {moment(transaction.date).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.color}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toFixed(7)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Change */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center font-semibold">
              <span>Total change:</span>
              <span className={totalChange === 0 ? "text-gray-500" : totalChange > 0 ? "text-blue-500" : "text-red-500"}>
                {totalChange.toFixed(7)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClashFlow;
