import { AnyMap } from "immer/dist/internal";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { prisma } from "../../src/prismaConnect";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return { props: { userTeams: null } };
  const userTeams = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    select: {
      teams: true,
    },
  });

  return {
    props: {
      userTeams,
    }, // will be passed to the page component as props
  };
}

const Dashboard = ({ userTeams }: { userTeams: any }) => {
  const { data: session, status } = useSession();
  if (!session) return <h1>You are not logged in</h1>;
  const { user } = session;
  console.log("userTeams", userTeams);

  return (
    <main>
      <div>{user?.name ? user?.name : user?.email}`s Dashboard</div>
      <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
        Create a Team
      </button>
    </main>
  );
};

Dashboard.auth = {
  restricted: true,
};

export default Dashboard;
