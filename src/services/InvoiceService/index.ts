import { ApiResponse, commonRequest } from "@/commons/req";
import { API_URL } from "../UserService";

export enum StatusInvoice {
    processing = "processing",
    completed = "completed",
    cancelled = "cancelled"
}

interface Invoice {
    code: string,
    type: string,
    status: StatusInvoice,
    amount: number,
    user_id: string,
    currency: string,
    description: string,
    request_id: string,
    createdAt: Date
}
const InvoiceService = {
    getHistory: async (token: string): Promise<ApiResponse<Invoice>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/invoice/history`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createInvoiceFpayment: async (data: any, token: string) => {
        try {
            const response = await commonRequest('post', `${API_URL}/invoice/fpayment`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error
        }
    }
};

export default InvoiceService;

