import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/Auth";

interface ComponentProps {
  Component: AppProps["Component"] & {
    auth?: {
      restricted?: boolean;
      role?: string;
      checkAdmin?: boolean;
    };
  };
  pageProps: AppProps["pageProps"];
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ComponentProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth component={Component}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
