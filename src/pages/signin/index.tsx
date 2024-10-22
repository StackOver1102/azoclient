import CustomImage from "@/components/Image/Image";
import { useMutationHooks } from "@/hooks/useMutationHook";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as UserService from "../../services/UserService";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUser } from "@/libs/redux/slices/userSlice";
import { persistor } from "@/libs/redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState<Boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGetDetailsUser = async (accessToken: string) => {
    try {
      const userDetails = await UserService.getDetail(accessToken);
      dispatch(updateUser({ ...userDetails, access_token: accessToken }));
      return userDetails;
    } catch (error: any) {
      showErrorToast("Get information user failed");
      if (error.message.includes("401 Unauthorized")) {
        persistor.purge();
      }
    }
  };

  const mutation = useMutationHooks<
    UserService.ResponseLogin,
    Error,
    UserService.BodyLoginUser
  >(
    async (data: UserService.BodyLoginUser) => {
      return await UserService.loginUser(data);
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: async (data) => {
        const access_token = data.access_token;
        setShowLoader(false);
        showSuccessToast("Login Successful");
        if (access_token) {
          localStorage.setItem("access_token", JSON.stringify(access_token));
          await handleGetDetailsUser(access_token);
          router.push("/")
        }
      },
      onError: (error: any) => {
        setShowLoader(false);

        // Extract the error message from the error object
        const errorMessage = error?.message || "Login Failed";

        // Show the error message in the toast
        showErrorToast(`Login failed: ${errorMessage}`);
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!email || !password) {
      showErrorToast("Please fill in both fields.");
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      await mutation.mutateAsync(data);

      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      // showErrorToast(`Login failed: ${error.message}`);
    }
  };

  const { status } = mutation;

  const isLoading = status === "pending";

  return (
    <>
      {isLoading || showLoader ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#13263c] to-[#2a4062]">
          <div className="flex justify-center items-center flex-col mb-12">
            <Link href="/" className="mb-12">
              <CustomImage
                alt="Logo"
                src={"/images/logo4.png"}
                className="h-[150px]"
                height={150}
                width={250}
              />
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Sign In
            </h1>

            <div className="text-center text-[#b5b5c3] font-medium mb-6">
              New here?{" "}
              <Link href="/signup" className="text-[#009ef7] font-semibold">
                Create an Account
              </Link>
            </div>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#009ef7] text-white font-semibold py-2 rounded-lg hover:bg-[#007bbd] transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
