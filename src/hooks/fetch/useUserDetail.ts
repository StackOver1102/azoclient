// hooks/useUserDetail.ts
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import UserService, { isApiError } from "@/services/UserService";

export const useUserDetail = (token: string | undefined) => {
    const router = useRouter();

    return useQuery({
        queryKey: ["userDetail", token],
        queryFn: async () => {
            try {
                // Gọi API và chỉ trả về dữ liệu user (lấy data từ ApiResponseDetail<User>)
                const response = await UserService.getDetail(token ?? "");
                if (!response || !response.data) {
                    throw new Error("No data returned from API");
                }
                return response.data;
            } catch (error: unknown) {
                if (isApiError(error)) {
                    if (error.status === 401) {
                        // showErrorToast("Invalid or expired token, please login again");
                        Cookies.remove("access_token");
                        router.push("/signin");
                    } else {
                        throw error;
                    }
                } else {
                    console.error("Unexpected error occurred:", error);
                    throw new Error("An unexpected error occurred");
                }
            }
        },
        staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút
        gcTime: 1000 * 60 * 10, // Giữ cache trong 10 phút
        retry: 1, // Chỉ thử lại 1 lần nếu có lỗi
        refetchOnWindowFocus: false, // Không tự động refetch khi quay lại tab
        enabled: !!token,
    });
}
