// src/pages/index.tsx

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CustomImage from "@/components/Image/Image";
import UserService, {
  ApiError,
  User,
  isApiError,
} from "@/services/UserService";
import { showErrorToast } from "@/services/toastService";
import { TypeHearder } from "@/types/enum";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Cookies from "js-cookie";
import Image from "next/image";
type Props = {
  token: string | null;
  error: ApiError | null;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token = context.req.cookies.access_token;
  const queryClient = new QueryClient();

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
        token: null,
      },
    };
  }

  try {
    await queryClient.prefetchQuery({
      queryKey: ["userDetail", token],
      queryFn: async () => {
        try {
          const response = await UserService.getDetail(token);
          if (!response || !response.data) {
            throw new Error("No data returned from API");
          }
          return response.data;
        } catch (error) {}
      },
    });

    return {
      props: {
        error: null,
        token,
        dehydratedState: dehydrate(queryClient), // Pass dehydrate state to hydrate client side
      },
    };
  } catch (err: any) {
    if (isApiError(err)) {
      const errorCode = err.status;
      if (errorCode === 401) {
        await UserService.logout(token);
      }
      return {
        props: {
          error: {
            status: errorCode,
            message: err.data?.error || "Failed to fetch user details",
          },
          token,
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
    return {
      props: {
        error: {
          status: 500,
          message: err.message || "Failed to fetch user details",
        },
        token,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

export default function Home(prop: Props) {
  const { token, error } = prop;
  // if (!user) {
  //   showErrorToast("User not found!");
  //   Cookies.remove("access_token");
  //   return;
  // }
  // if (!token || error?.status === 401) {
  //   // Show error toast message
  //   showErrorToast("Unauthorized: Invalid or expired token please login again");
  //   Cookies.remove("access_token");
  //   // return;
  // }

  const [counterOn, setCounterOn] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Kích hoạt một lần khi phần tử vào khung nhìn
    onChange: (inView) => setCounterOn(inView),
  });

  return (
    <>
      <Header logo="/images/logo4.png" token={token} type={TypeHearder.HOME} />
      {/* START LANDING */}
      <section className="bg-[#13263c] dark:bg-gray-900 pt-10" id="hero">
        <div className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-4xl lg:leading-[3rem] dark:text-white">
            Cheapest SMM Panel Over 10 Years!
            <br />
            with
            <span id="temp">
              <span className="pl-2">1TAP SMM Panel - Social Services</span>
            </span>
          </h1>
          <div className="flex flex-col mb-8 lg:mt-16 lg:mb-24  space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              href="/signup"
              className={`${
                token ? "hidden" : ""
              } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            >
              Sign up now!
            </Link>
          </div>
        </div>
      </section>
      {/* END LANDING */}

      <section className="bg-white dark:bg-gray-900" id="test">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-[2.5rem] font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-[2.5rem] dark:text-white">
            How it Works
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Save thousands to millions of bucks by using my services
            <br />
            for different amazing and great useful admin.
          </p>

          <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
            {/* Grid với 3 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="grid2-item">
                <Image
                  src={`/images/2.png`}
                  className="max-h-[280px] mb-9"
                  alt="Logo"
                  height={280}
                  width={280}
                />
                <div className="flex justify-center items-center mb-5">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
                    1
                  </span>
                  <div className="fs-5 text-xl font-bold text-black">
                    Sign Up
                  </div>
                </div>
                <div className="font-bold text-[#a1a5b7] text-xl">
                  First you need have account for login then you can see
                  dashboard. Your info is safe, we not share it to others.
                </div>
              </div>

              <div className="grid2-item">
                <Image
                  src={`/images/8.png`}
                  className="max-h-[280px] mb-9"
                  alt="Logo"
                  height={280}
                  width={280}
                />
                <div className="flex justify-center items-center mb-5">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
                    2
                  </span>
                  <div className="fs-5 text-xl font-bold text-black">
                    Add funds
                  </div>
                </div>
                <div className="font-bold text-[#a1a5b7] text-xl">
                  You need deposit fund to your account in deposit iseasy and
                  secure. We have many payment methods for you.
                </div>
              </div>

              <div className="grid2-item">
                <Image
                  src={`/images/12.png`}
                  className="max-h-[280px] mb-9"
                  alt="Logo"
                  height={270}
                  width={270}
                />
                <div className="flex justify-center items-center mb-5">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
                    3
                  </span>
                  <div className="fs-5 text-xl font-bold text-black">
                    Create order
                  </div>
                </div>
                <div className="font-bold text-[#a1a5b7] text-xl">
                  You have balance in your account, so now you can place orders
                  with services you want. That's easy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#13263c] dark:bg-gray-900" id="achievements">
        <div
          className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
          ref={ref}
        >
          <h1 className="mb-4 text-[calc(1.375rem + 1.5vw)] font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-[2.5rem] dark:text-white">
            We Make Things Better
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Save thousands to millions of bucks by using my services
            <br />
            for different amazing and great useful admin.
          </p>

          <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
            {/* Grid với 3 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Grid item 1 */}
              <div className="grid2-item flex flex-col justify-center items-center bg-[#1c3550] h-[300px] w-[300px] rounded-[10px] shadow-lg p-8">
                <span className="svg-icon svg-icon-2tx svg-icon-white mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-12 w-12"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="9"
                      height="9"
                      rx="2"
                      fill="white"
                    ></rect>
                    <rect
                      opacity="0.3"
                      x="13"
                      y="2"
                      width="9"
                      height="9"
                      rx="2"
                      fill="white"
                    ></rect>
                    <rect
                      opacity="0.3"
                      x="13"
                      y="13"
                      width="9"
                      height="9"
                      rx="2"
                      fill="white"
                    ></rect>
                    <rect
                      opacity="0.3"
                      x="2"
                      y="13"
                      width="9"
                      height="9"
                      rx="2"
                      fill="white"
                    ></rect>
                  </svg>
                </span>
                <div className="text-white font-bold text-3xl mb-2">
                  {counterOn && (
                    <CountUp
                      start={0}
                      end={23469975}
                      className="text-white min-w-[70px]"
                      formattingFn={(num) => num.toString()}
                    />
                  )}
                  +
                </div>
                <div className="text-gray-400 text-lg">Orders</div>
              </div>

              {/* Grid item 2 */}
              <div className="grid2-item flex flex-col justify-center items-center bg-[#1c3550] h-[300px] w-[300px] rounded-[10px] shadow-lg p-8">
                <span className="svg-icon svg-icon-2tx svg-icon-white mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-12 w-12"
                  >
                    <path
                      d="M13 10.9128V3.01281C13 2.41281 13.5 1.91281 14.1 2.01281C16.1 2.21281 17.9 3.11284 19.3 4.61284C20.7 6.01284 21.6 7.91285 21.9 9.81285C22 10.4129 21.5 10.9128 20.9 10.9128H13Z"
                      fill="white"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M13 12.9128V20.8129C13 21.4129 13.5 21.9129 14.1 21.8129C16.1 21.6129 17.9 20.7128 19.3 19.2128C20.7 17.8128 21.6 15.9128 21.9 14.0128C22 13.4128 21.5 12.9128 20.9 12.9128H13Z"
                      fill="white"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M11 19.8129C11 20.4129 10.5 20.9129 9.89999 20.8129C5.49999 20.2129 2 16.5128 2 11.9128C2 7.31283 5.39999 3.51281 9.89999 3.01281C10.5 2.91281 11 3.41281 11 4.01281V19.8129Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <div className="text-white font-bold text-3xl mb-2">
                  $ 0.0001
                </div>
                <div className="text-gray-400 text-lg">Price Starting From</div>
              </div>

              {/* Grid item 3 */}
              <div className="grid2-item flex flex-col justify-center items-center bg-[#1c3550] h-[300px] w-[300px] rounded-[10px] shadow-lg p-8">
                <span className="svg-icon svg-icon-2tx svg-icon-white mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-12 w-12"
                  >
                    <path
                      d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z"
                      fill="white"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z"
                      fill="white"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <div className="text-white font-bold text-3xl mb-2">
                  0.1 sec
                </div>
                <div className="text-gray-400 text-lg">
                  An Order Is Made Every
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 relative z-[2] py-12">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-[2.5rem] font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-[2.5rem] dark:text-white">
            What Our Clients Say
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Happy Clients
          </p>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
            {/* Grid chia thành 3 cột */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Testimonial Item 1 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                  Exceeded expected result. Highly recommended if you like to
                  boost view of your video on any social media. Will definitely
                  use the service again.
                </p>
                <div className="flex items-center">
                  <img
                    src="/images/300-1.jpg"
                    className="w-14 h-14 rounded-full mr-4"
                    alt="Paul Miles"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold">
                      Paul Miles
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">
                      Marketing Expert
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial Item 2 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                  Go with this guy if you want quality and good communication.
                  His service is amazing and I will continue to use it.
                </p>
                <div className="flex items-center">
                  <img
                    src="/images/300-1.jpg"
                    className="w-14 h-14 rounded-full mr-4"
                    alt="Janya Clebert"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold">
                      Janya Clebert
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">
                      Development Lead
                    </span>
                  </div>
                </div>
              </div>

              {/* Testimonial Item 3 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                  This panel did such an extremely good job. Excellent! I would
                  advise anyone to go to him. He will get the job done!
                </p>
                <div className="flex items-center">
                  <img
                    src="/images/300-1.jpg"
                    className="w-14 h-14 rounded-full mr-4"
                    alt="Steave Brown"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-bold">
                      Steave Brown
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">
                      Content Creator
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex justify-between items-center flex-wrap md:flex-nowrap rounded-lg p-8 lg:p-12 mt-12 bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
                  Start creating orders now!
                </h2>
                <p className="text-lg lg:text-xl font-medium">
                  Create orders with over 1,000 services available
                </p>
              </div>
              <button className="px-6 py-3 bg-white text-cyan-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale!, ["common"])),
//     },
//   };
// };
