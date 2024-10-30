import 'daterangepicker/daterangepicker.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../i18n/i18n"; // Translation setup
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import React from "react";
import 'daterangepicker';
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";


function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Caching dữ liệu trong 5 phút
            // cacheTime: 1000 * 60 * 10, // Dữ liệu sẽ bị xóa sau 10 phút nếu không sử dụng
            refetchOnWindowFocus: false, // Không refetch khi người dùng quay lại trang
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          />
          <meta name="google-site-verification" content="zHO7oniUY1rRa36u3j4keSFeXo0bacLdJ-yroxM1Z90" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={5000} />
        <ReactQueryDevtools initialIsOpen={false} /> {/* Optional: devtools */}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
