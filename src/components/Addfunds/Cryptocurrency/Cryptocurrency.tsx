import { CustomError } from "@/commons/req";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { DataForm } from "@/pages/addfunds";
import InvoiceService from "@/services/InvoiceService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

export enum ChannelInvoice {
    BANKING = "banking",
    FPAYMENT = "fpayment"
}

type BodyCreate = {
    channel: ChannelInvoice,
    amount: string
}


export default function Cryptocurrency({ token }: { token: string | null }) {
    const [amount, setAmount] = useState(10);
    const [showLoader, setShowLoader] = useState<boolean>(false)
    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    };
    const router = useRouter()
    const mutation = useMutationHooks(
        async ({
            data,
            token,
        }: {
            data: BodyCreate;
            token: string;
        }) => {
            try {
                return await InvoiceService.createInvoiceFpayment(data, token);
            } catch (error) {
                throw error;
            }
        },
        {
            onMutate: () => {
                setShowLoader(true);
            },
            onSuccess: (data) => {
                setShowLoader(false);
                showSuccessToast("Create  successful");
                router.replace(data.data)
            },
            onError: (error: CustomError) => {
                if (error.status) {
                    const statusCode = error.status;
                    const message = error.data.error;
                    if (statusCode === 400) {
                        showErrorToast(`${message}.`);
                    } else if (statusCode === 401) {
                        showErrorToast("Unauthorized: You need to log in again.");
                        // persistor.purge();
                        router.push("/signin");
                    } else if (statusCode === 500) {
                        showErrorToast("The server is busy, please try again later.");
                    } else {
                        showErrorToast(
                            `An error occurred: ${error.message || "Unknown error"}`
                        );
                    }
                } else {
                    showErrorToast("The server is busy, please try again later.");
                }
            },
            onSettled: () => {
                setShowLoader(false);
            },
        }
    );
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data: BodyCreate = {
                amount: amount.toFixed(2).toString(),
                channel: ChannelInvoice.FPAYMENT
            }
            if (!token) return;
            await mutation.mutateAsync({ data, token })
        } catch (error) {

        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Biểu tượng */}
            <div className="w-20 h-20 mb-4">
                <Image
                    src="/images/icon-svg/trader.svg"
                    alt="Payment Icon"
                    className="w-full h-full"
                    width={40}
                    height={40}
                />
            </div>

            {/* Form */}
            <form
                className="w-full max-w-sm"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Enter amount: (USD)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter amount"
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Do it now
                </button>
            </form>
        </div>
    );
}
