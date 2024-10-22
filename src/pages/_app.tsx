import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../i18n/i18n"; // Translation setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux"; // Redux Provider
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for redux-persist
import { store, persistor } from "../libs/redux/store"; // Redux store and persistor
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            />
          </Head>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} />
          <ReactQueryDevtools initialIsOpen={false} />{" "}
          {/* Optional: devtools */}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(App);
