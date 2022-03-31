import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { Key } from "readline";
import { AuthenticationError } from "../../components/AuthenticationError";
import { Errors } from "../../components/AuthenticationError";
import DynamicIcon from "../../components/DynamicIcon";

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}

const SignIn = ({
  providers,
  csrfToken,
}: {
  providers: any;
  csrfToken: any;
}) => {
  const { error } = useRouter().query;
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        router.replace("/auth/signin", undefined, { shallow: true });
      }, 3000);
    }
  }, [error, router]);

  return (
    <main className="flex flex-col items-center py-10  ">
      {error && <AuthenticationError error={error as keyof Errors} />}
      <div className="w-3/4 sm:w-1/2 lg:1/3 flex flex-col gap-6 items-center">
        {Object.values(providers).map((provider: any, i) => (
          <>
            {provider.name === "Email" ? (
              <div key={provider.name} className="w-full lg:w-3/4">
                <form
                  method="post"
                  action="/api/auth/signin/email"
                  className="flex flex-col "
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 focus:ring-gray-800  block w-full shadow-sm sm:text-sm rounded-md mb-2 border-2 py-2 px-3 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    Sign in with Email
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="inline-flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
                >
                  Sign in with {provider.name}{" "}
                  <DynamicIcon
                    icon={provider.name}
                    className="text-center"
                    size={20}
                  />
                </button>
              </div>
            )}
            {i !== Object.values(providers).length - 1 && (
              <span className="text-center text-lg font-semibold">or</span>
            )}
          </>
        ))}
      </div>
    </main>
  );
};

export default SignIn;
