import { ApiResponse, commonRequest } from "@/commons/req";
import { API_URL, User } from "../UserService";
import { Orders } from "../OrderService";

interface Refill {
    user: string | User
    orderId: string | Orders
    createdAt: Date
}
const RefillService = {
    createRefill: async (orderId: string[], token: string): Promise<ApiResponse<Refill>> => {
        try {
            const response = await commonRequest('post', `${API_URL}/refill`, { orderId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default RefillService;
