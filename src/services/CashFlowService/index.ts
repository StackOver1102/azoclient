import { ApiResponse, commonRequest } from "@/commons/req";
import { API_URL } from "../UserService";

export enum TypeHistory {
    addMoney = "addMoney",
    order = "order"
}

export type CashFlow = {
    _id: string,
    user: string;
    method: string;
    amount: number;
    amountOld: number;
    description: string;
    type: TypeHistory;
    createdAt: Date
}
const CashFlowService = {
    getCashFlow: async (token: string): Promise<ApiResponse<CashFlow>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/history`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getCashFlowPay: async (token: string): Promise<ApiResponse<CashFlow>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/history/pay`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default CashFlowService;
