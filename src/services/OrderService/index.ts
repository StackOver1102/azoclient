import { commonRequest } from "@/commons/req";
import { API_URL } from "../UserService";

export interface BodyCreateOrder {  // Xuất interface BodyCreateOrder
    quantity: number;
    link: string;
    service: string;
}

const OrderService = {
    createOrder: async (data: BodyCreateOrder) => {
        try {
            const response = await commonRequest('post', `${API_URL}/orders`, { orderService: data });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching data: ', error.message);
            throw error;
        }
    },
};

export default OrderService;
