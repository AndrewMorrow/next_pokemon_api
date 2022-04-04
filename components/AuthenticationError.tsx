export interface Errors {
  Signin: string;
  OAuthSignin: string;
  OAuthCallback: string;
  OAuthCreateAccount: string;
  EmailCreateAccount: string;
  Callback: string;
  OAuthAccountNotLinked: string;
  EmailSignin: string;
  CredentialsSignin: string;
  default: string;
}

const errors: Errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Please check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Please try to sign in.",
};

export const AuthenticationError = ({ error }: { error?: keyof Errors }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <>
      {error ? (
        <div className="bg-red-200 p-4 rounded-md my-6 h-14">
          {errorMessage}
        </div>
      ) : (
        <div className="p-4 invisible my-6 h-14" />
      )}
    </>
  );
};
