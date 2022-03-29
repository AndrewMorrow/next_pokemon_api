import React from "react";
import { useSession, signIn } from "next-auth/react";

interface Props {
  children: JSX.Element;
}

const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default Auth;
