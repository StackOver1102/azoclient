import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Table from "@/components/Table/Table";
import { showErrorToast } from "@/services/toastService";
import { ApiError } from "@/services/UserService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

type Props = {
  error: ApiError | null;
  token: string | null;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  if (!token) {
    return {
      props: {
        error: {
          status: 401,
          message: "Unauthorized: Invalid or expired token",
        },
        token: null,
      },
    };
  }

  let error = null;

  return {
    props: {
      error,
      token,
    },
  };
};

const Order = (props: Props) => {
  const { error, token } = props;
  if (!token || error?.status === 401) {
    // Show error toast message
    showErrorToast("Unauthorized: Invalid or expired token please login again");
    Cookies.remove("access_token");
    return;
  }

  return (
    <div className="flex">
      <Sidebar isLogin={token ? true : false} />
      <div className="flex-1 lg:ml-64">
        <Header
          logo="/images/logo4.png"
          token={token}
          type={TypeHearder.OTHE}
        />
        <div className="grid grid-cols-1 gap-4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
