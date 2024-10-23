import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Loading from "@/components/Loading/Loading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useMutationHooks } from "@/hooks/useMutationHook";
import withAuth from "@/libs/wrapAuth/warpAuth";
import UserService, {
  ApiError,
  BodyUser,
  ResponseHistoryLogin,
} from "@/services/UserService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import { TypeHearder } from "@/types/enum";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { CustomError } from "@/commons/req";

type Props = {
  error: ApiError;
  loginHistory: ResponseHistoryLogin[] | null;
  token: string | null;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: "/signin",
  //       permanent: false,
  //     },
  //   };
  // }
  if (!token) {
    return {
      props: {
        error: {
          status: 401,
          message: "Unauthorized: Invalid or expired token",
        },
        loginHistory: null,
        token: null,
      },
    };
  }

  let loginHistory = null;
  let error = null;

  try {
    const response = await UserService.getHistoryLogin(token.trim());
    console.log("🚀 ~ response:", response);

    loginHistory = response.data;
  } catch (err: any) {
    error = err.message || "Failed to fetch login history";
    console.error("Error fetching login history:", err);
  }

  // Return the data and any error to the component
  return {
    props: {
      loginHistory,
      error,
      token,
    },
  };
};

const Setting = (props: Props) => {
  const { loginHistory, error, token } = props;
  console.log("🚀 ~ Setting ~ token:", token);
  console.log("🚀 ~ Setting ~ error:", error);
  const router = useRouter();
  if (!token || error?.status === 401) {
    // Show error toast message
    showErrorToast("Unauthorized: Invalid or expired token please login again");
    // persistor.purge();
    Cookies.remove("access_token");
    return;
  }
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showLoader, setShowLoader] = useState<Boolean>(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleGetDetailsUser = async (accessToken: string) => {
  //   try {
  //     const userDetails = await UserService.getDetail(accessToken);
  //     // dispatch(updateUser({ ...userDetails, access_token: accessToken }));
  //     return userDetails;
  //   } catch (error: any) {
  //     showErrorToast("Get information user failed");
  //     if (error.message.includes("401 Unauthorized")) {
  //       router.push("/signin");
  //     }
  //   }
  // };
  // const userLogin = useSelector((state: RootState) => state.user);

  const mutation = useMutationHooks(
    async ({ userData, token }: { userData: BodyUser; token: string }) => {
      try {
        const result = await UserService.updateProfile(userData, token);
        return result;
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: async () => {
        setShowLoader(false);
        // await handleGetDetailsUser(token);
        showSuccessToast("Update user successful");
      },
      onError: (error: CustomError) => {
        if (error.status) {
          const statusCode = error.status;
          const message = error.message;
          if (statusCode === 400) {
            showErrorToast(`Bad Request:${message}.`);
          } else if (statusCode === 401) {
            showErrorToast("Unauthorized: You need to log in again.");
            // persistor.purge();
            router.push("/signin");
          } else if (statusCode === 500) {
            showErrorToast("The server is busy, please try again later.");
          } else {
            showErrorToast(
              `An error occurred: ${error.message || "Unknown error"}`
            );
          }
        } else {
          showErrorToast("The server is busy, please try again later.");
        }
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone) {
      showErrorToast("Phone number is required.");
      return;
    }

    const data = {
      phoneNumber: formData.phone,
    };

    await mutation.mutateAsync({
      userData: data,
      token,
    });
  };

  const submitHandleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      showErrorToast("Current Password is required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showErrorToast("Passwords do not match. Please try again.");
      return;
    }

    const data: BodyUser = {
      password: formData.newPassword,
    };

    await mutation.mutateAsync({
      userData: data,
      token,
    });
  };

  // useEffect(() => {
  //   if (token) {
  //     setFormData({
  //       ...formData,
  //       ["email"]: userLogin.email,
  //       ["phone"]: userLogin.phoneNumber,
  //     });
  //   }
  // }, [userLogin]);

  return (
    <div className="flex">
      {showLoader && <Loading />}
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* <Header
          logo="/images/logo4.png"
          user={userLogin}
          token={token}
          type={TypeHearder.OTHE}
        /> */}

        {/* Settings Title */}
        <div className="px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        </div>

        {/* Security Settings Section */}
        <div className="p-6">
          {/* Card Wrapper */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Card Header */}
            <div className="border-b border-gray-300 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">Security</h3>
            </div>

            {/* Card Body */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email and Phone Fields */}
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  readOnly
                  onChange={handleChange}
                  disabled={true}
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  required
                />

                {/* Update Button - spans both columns */}
                <div className="col-span-1 lg:col-span-2 flex flex-wrap gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={submitHandler}
                  >
                    Update
                  </button>
                </div>

                {/* Password Fields */}
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  placeholder="Enter current password"
                  onChange={handleChange}
                  required
                />
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  placeholder="Enter new password"
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  placeholder="Confirm new password"
                  onChange={handleChange}
                  required
                />

                {/* Change Password Button - spans both columns */}
                <div className="col-span-1 lg:col-span-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={submitHandleChangePassword}
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-in history Section */}
        <div className="p-6">
          {/* Card Wrapper */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Card Header */}
            <div className="border-b border-gray-300 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Sign-in history
              </h3>
            </div>

            {/* Card Body */}
            <div className="px-6 py-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        IP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-7/12"
                      >
                        Device
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Example Row 1 */}
                    {loginHistory?.map((item: ResponseHistoryLogin, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.deviceInfo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dayjs(new Date(item.loginTime)).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Setting);
