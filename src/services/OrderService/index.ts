import { ApiResponse, commonRequest } from "@/commons/req";
import { API_URL, User } from "../UserService";

export interface BodyCreateOrder {  // Xuất interface BodyCreateOrder
    quantity: number;
    link: string;
    service: string;
}

export interface OrderItem {
    quantity: number;
    link: string;
    service: string;
    order: string;
    name?: string;
    keyword?: string;
    badges?: string[]
}

export interface Orders {
    _id: string;
    user: User;
    totalPrice: number;
    orderItems: OrderItem;
    origin: string;
    orderStatus: string;
    charge: number;
    remains: number;
    start_count: number;
    createdAt: Date;
    updatedAt: Date
}

const OrderService = {
    createOrder: async (data: BodyCreateOrder, token: string) => {
        try {
            const response = await commonRequest('post', `${API_URL}/orders`, { orderService: data }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllOrder: async (token: string): Promise<ApiResponse<Orders>> => {
        try {
            const response = await commonRequest('get', `${API_URL}/orders`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getDetail: async (token: string) => {
        try {
            const response = await commonRequest('get', `${API_URL}/orders`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createMassOrder: async (orders: string, token: string): Promise<ApiResponse<Orders>> => {
        try {
            const response = await commonRequest('post', `${API_URL}/orders/massOrder`, { orders }, {
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

export default OrderService;
