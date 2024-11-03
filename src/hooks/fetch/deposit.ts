import { useQuery } from "@tanstack/react-query";
import DepositService from "@/services/DepositService";

function depositFetch(name: string, token: string | null) {
    return useQuery({
        queryKey: ['deposit', name, token],
        queryFn: async () => {
            try {
                const data = await DepositService.getDeposit(name, token);
                if (!data) {
                    throw new Error('No desposit found'); // Throw an error if data is null or undefined
                }
                return data;
            } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
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

export default depositFetch;
