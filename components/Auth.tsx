import React from "react";
import { useSession, signIn } from "next-auth/react";
import type { AppProps } from "next/app";

interface Props {
  children: JSX.Element;
  component: AppProps["Component"] & {
    auth?: {
      restricted?: boolean;
      role?: string;
      checkAdmin?: boolean;
    };
  };
}

const Auth = ({ children, component }: Props) => {
  const { data: session, status } = useSession({ required: true });
  console.log(session);

  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (component?.auth?.checkAdmin) {
    if (component?.auth?.role === session?.role) {
      return children;
    } else {
      return (
        <h1 className="text-lg font-bold mt-8">
          You do not have permissions to visit this page.
        </h1>
      );
    }
  }

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default Auth;
