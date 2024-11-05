import { DataForm } from "@/pages/addfunds";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  data: DataForm;
}
// const PerfectMoneyPayment<T> (props: Props<T>) => {
export default function PerfectMoneyPayment(props: Props) {
  const { data } = props;
  const [amount, setAmount] = useState(10); // Thiết lập giá trị mặc định là 10 USD

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
};

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Biểu tượng */}
      <div className="w-20 h-20 mb-4">
        <Image
          src="/images/icon-svg/dollar.svg" // Đường dẫn đến biểu tượng tương tự trong hình
          alt="Payment Icon"
          className="w-full h-full"
          width={40}
          height={40}
        />

        {/* <Image
          src="/images/bank.png"
          alt="Bank icon"
          className="h-6 w-6"
          width={24}
          height={24}
        /> */}
      </div>

      {/* Form */}
      <form
        action="https://perfectmoney.is/api/step1.asp"
        method="POST"
        className="w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter amount: (USD)
          </label>
          <input
            type="number"
            name="PAYMENT_AMOUNT"
            value={amount}
            onChange={handleAmountChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
          />
        </div>

        {/* Hidden Fields */}
        <input type="hidden" name="PAYEE_ACCOUNT" value={data?.PAYEE_ACCOUNT} />
        <input type="hidden" name="PAYEE_NAME" value={data.PAYEE_NAME} />
        <input type="hidden" name="PAYMENT_UNITS" value={data.PAYMENT_UNITS} />
        <input type="hidden" name="STATUS_URL" value={data?.STATUS_URL} />
        <input
          type="hidden"
          name="SUGGESTED_MEMO"
          value={data?.SUGGESTED_MEMO}
        />
        <input type="hidden" name="PAYMENT_URL" value={data?.PAYMENT_URL} />
        <input type="hidden" name="PAYMENT_URL_METHOD" value="LINK" />
        <input type="hidden" name="NOPAYMENT_URL_METHOD" value="LINK" />
        <input type="hidden" name="PAYMENT_ID" value={data?.PAYMENT_ID} />
        <input type="hidden" name="NOPAYMENT_URL" value={data?.NOPAYMENT_URL} />
        <input type="hidden" name="BAGGAGE_FIELDS" value="USER_ID" />
        <input type="hidden" name="USER_ID" value="123456" />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Do it now
        </button>
      </form>
    </div>
  );
}
