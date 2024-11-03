import { commonRequest } from "@/commons/req";
import { API_URL } from "../UserService";

const DepositService = {
    getDeposit: async (name: string, token: string | null) => {
        try {
            const response = await commonRequest('get', `${API_URL}/deposit/${name}`, {}, {
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

export default DepositService;
