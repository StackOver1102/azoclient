import { useQuery } from "@tanstack/react-query";
import DepositService from "@/services/DepositService";

function useDepositFetch(name: string, token: string | null) {
    return useQuery({
        queryKey: ['deposit', name, token],
        queryFn: async () => {
            try {
                const data = await DepositService.getDeposit(name, token);
                if (!data) {
                    throw new Error('No deposit found'); // Corrected spelling here
                }
                return data;
            } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
                throw {
                    status: error.response?.status || 500,
                    message: error.response?.data?.message || 'Failed to fetch deposit data',
                };
            }
        },
        refetchOnWindowFocus: false,
        staleTime: 5000,
        refetchInterval: 60000,
        enabled: !!token,
    });
}

export default useDepositFetch;
