import Table from "@/components/Table/Table";
import { showErrorToast } from "@/services/toastService";
import { ApiError, isApiError } from "@/services/UserService";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import OrderService from "@/services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import withAuth from "@/libs/wrapAuth/warpAuth";
import { useEffect } from "react";

type Props = {
  error: ApiError | null;
  token: string | null;
  isLayout: boolean
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      error: null,
      token,
      isLayout: true
    },
  };
};

const Order = (props: Props) => {
  const { error, token } = props;
  const router = useRouter();

  useEffect(() => {
    if (!token || error?.status === 401) {
      // Show error toast message and redirect
      showErrorToast(
        "Unauthorized: Invalid or expired token, please login again"
      );
      Cookies.remove("access_token");
      router.push("/signin");
    }
  }, [token, error, router]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", token],
    queryFn: async () => {
      try {
        // Gọi API và chỉ trả về dữ liệu `user` (lấy `data` từ `ApiResponseDetail<User>`)
        const response = await OrderService.getAllOrder(token!);
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        return response.data;
      } catch (error: unknown) {
        if (isApiError(error)) {
          if (error.status === 401) {
            showErrorToast("Invalid or expired token, please login again");
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

  return (
    <>
      {isLoading && <Loading/>}
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 ">
        <div className="bg-white p-6 rounded-lg shadow-custom">
          <div className="overflow-x-auto">
            <Table data={orders ?? []} token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Order);
