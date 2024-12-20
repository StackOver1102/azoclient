import CustomImage from "@/components/Image/Image";
import { useMutationHooks } from "@/hooks/useMutationHook";
import Link from "next/link";
import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/services/toastService";
import UserService, { BodyUser } from "@/services/UserService";
import { CustomError } from "@/commons/req";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";

const Signup = () => {
  // State to handle form input
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const router = useRouter();
  const mutation = useMutationHooks(
    async (userData: BodyUser) => {
      try {
        return await UserService.createdUser(userData);
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: () => {
        setShowLoader(false);
        showSuccessToast("Sign Up Successful");
      },
      onError: (error: CustomError) => {
        if (error.status) {
          const statusCode = error.status;
          const message = error.data.error;
          if (statusCode === 400) {
            showErrorToast(`${message}.`);
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

  // Submit handler
  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        showErrorToast("Passwords do not match");
        return;
      }
      if (password.length < 8) {
        showErrorToast("Password must be at least 8 characters long");
        return;
      }
      const userBody: BodyUser = {
        name,
        email,
        password,
      };

      await mutation.mutate(userBody);
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error);
    }
  };

  return (
    <>
      {showLoader && <Loading />}
      <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-fixed bg-no-repeat bg-[url('https://1dg.me/assets/media/bg-1.png')] dark:bg-gradient-to-b dark:from-[#0d1b2a] dark:to-[#1b3a4b] px-4 sm:px-0">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <CustomImage
              alt="Logo"
              src={"/images/logo4.png"}
              className="h-[120px] sm:h-[150px]"
              height={150}
              width={250}
            />
          </Link>
        </div>
        <div className="w-full max-w-md p-10 space-y-6 bg-white shadow-2xl rounded-xl">
          <div className="text-center">

            <h1 className="text-3xl font-bold text-gray-900  mb-2">
              Create an Account
            </h1>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account?
              <Link
                href="/signin"
                className="text-[#009ef7] font-semibold hover:underline"
              >
                {" "}Sign in here
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nguyen Van A"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009ef7]"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009ef7] "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009ef7] "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009ef7] "
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-[#009ef7] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-3 text-sm font-light text-gray-500 "
              >
                I accept the{" "}
                <Link
                  href="#"
                  className="font-medium text-[#009ef7] hover:underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-[#009ef7] rounded-lg font-medium text-sm hover:bg-[#007acc] focus:outline-none focus:ring-4 focus:ring-[#009ef7] dark:bg-[#009ef7] dark:hover:bg-[#007acc] dark:focus:ring-[#007acc]"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>

    </>
  );
};

export default Signup;
