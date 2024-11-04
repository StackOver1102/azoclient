import { FC, useState, useRef } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import Image from "next/image";
import { DataForm } from "@/pages/addfunds";

interface Props {
    data: DataForm;
    userId: string | undefined;
}

export const PayPalButton: FC<Props> = ({ data: dataServer, userId }) => {
    const [amount, setAmount] = useState<string>("1");
    const amountRef = useRef<string>(amount); // Sử dụng useRef để lưu giá trị mới nhất của amount

    if (!userId) return null;

    // Cập nhật giá trị mới nhất của amount trong useRef khi state thay đổi
    const handleAmountChange = (value: string) => {
        setAmount(value);
        amountRef.current = value;  // Cập nhật giá trị vào amountRef
    };

    const handleApprove = (orderID: string) => {
        console.log("Transaction approved, Order ID: ", orderID);
    };

    // Sử dụng amountRef để đảm bảo giá trị luôn được cập nhật mới nhất khi tạo đơn hàng
    const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: dataServer?.PAYMENT_UNITS ?? "USD",
                        value: amountRef.current,  // Truyền giá trị amount từ amountRef
                    },
                    custom_id: `UserId_${userId}`,  // Truyền UserId
                },
            ],
        });
    };

    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data, actions) => {
        if (actions.order) {
            const order = await actions.order.capture();
            handleApprove(order.id ?? "");
        }
    };

    const onCancel = (data: any) => {
        console.log("Payment canceled:", data);
    };

    const onError = (err: any) => {
        console.error("Error occurred during payment:", err);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg max-w-md mx-auto">
            {/* PayPal Icon */}
            <div className="w-20 h-20 mb-4">
                <Image
                    src="/images/icon-svg/paypal.svg" // Path to your PayPal icon
                    alt="Payment Icon"
                    width={80}
                    height={80}
                    className="w-full h-full"
                />
            </div>

            {/* Form Section */}
            <PayPalScriptProvider
                options={{
                    clientId: dataServer?.PAYEE_ACCOUNT ?? "AQuBGiiiRuvTNDDTRUAafRr0iYmRnJV239Iq5vLPBZzPCBNZj3GxOoVpqqAOsle5L-7jPKQuUzw1cxWl", // Your PayPal client ID here
                    currency: dataServer?.PAYMENT_UNITS ?? "USD",
                }}
            >
                <div className="flex flex-col items-center w-full">
                    {/* Amount Input */}
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                        Enter amount: (USD)
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}  // Cập nhật state và ref khi thay đổi giá trị
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                    />

                    {/* PayPal Buttons */}
                    <div className="w-full">
                        <PayPalButtons
                            createOrder={createOrder} // Sử dụng hàm createOrder với giá trị amount từ ref
                            onApprove={onApprove}
                            onCancel={onCancel}
                            onError={onError}
                            style={{
                                layout: "vertical",
                                color: "gold",
                                shape: "rect",
                                label: "paypal",
                            }}
                        />
                    </div>
                </div>
            </PayPalScriptProvider>
        </div>
    );
};
