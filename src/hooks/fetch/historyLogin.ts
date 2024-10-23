import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/UserService";

function getHistoryLogin(token: string) {
    return useQuery({
        queryKey: ['historyLogin', token],
        queryFn: async () => {
            try {
                const data = await UserService.getHistoryLogin(token);
                if (!data) {
                    throw new Error('No login history found'); // Throw an error if data is null or undefined
                }
                return data;
            } catch (error: any) {
                throw {
                    status: error.response?.status || 500,
                    message: error.response?.data?.message || 'Failed to fetch login history',
                };
            }
        },
        refetchOnWindowFocus: false,
        staleTime: 5000,
        refetchInterval: 60000,
        enabled: !!token,
    });
}

export default getHistoryLogin;
