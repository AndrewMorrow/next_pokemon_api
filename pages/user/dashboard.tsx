import { AnyMap } from "immer/dist/internal";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import PokemonCard from "../../components/PokemonCard";
import Team from "../../components/Team";
import { prisma } from "../../src/prismaConnect";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return { props: { userTeams: null } };
  const userTeams = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    select: {
      teams: {
        include: {
          pokemon: true,
        },
      },
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
  const teamName = useRef<HTMLInputElement>(null);

  const [userTeamList, setUserTeamList] = useState(userTeams);

  if (!session) return <h1>You are not logged in</h1>;
  const { user } = session;

  const handlecreateNewTeam = async () => {
    if (teamName?.current?.value === "" && !teamName.current) return;
    await fetch("/api/pokemon/team/createTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamName: teamName?.current?.value }),
    });

    const res = await fetch("/api/user/getUserTeams");
    const data = await res.json();

    setUserTeamList(data.userTeams);
    if (teamName?.current?.value) teamName.current.value = "";
  };

  const handleDeleteTeam = async (teamName: string) => {
    await fetch("/api/team/deleteTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamName }),
    });

    const res = await fetch("/api/user/getUserTeams");
    const data = await res.json();

    setUserTeamList(data.userTeams);
  };

  return (
    <main>
      <h1 className="text-center font-bold text-2xl py-4">
        {user?.name ? user?.name : user?.email}`s Dashboard
      </h1>
      <div className="sm:flex gap-10 lg:gap-16">
        <div className="">
          <h2 className="block font-bold text-xl pt-4 mb-2">
            Create a new team
          </h2>
          <div className="flex gap-4 items-end flex-wrap">
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700"
            >
              Team Name
              <input
                ref={teamName}
                type="teamName"
                id="teamName"
                name="teamName"
                className="mt-1 focus:ring-gray-800  block w-full shadow-sm sm:text-sm rounded-md border-2 py-2 px-3 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              />
            </label>
            <button
              className="  py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              onClick={() => handlecreateNewTeam()}
            >
              Create my Team
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="block font-bold text-xl pt-4 mb-4">My Teams</h2>
          {userTeamList?.teams?.length > 0 ? (
            userTeamList?.teams?.map((team: any) => (
              <div key={team.id} className="shadow-md rounded-md">
                <div className="flex bg-gray-800 text-white rounded-tl-md rounded-tr-md justify-center relative">
                  <h1 className=" font-semibold text-xl p-1 ">{team.name} </h1>
                  <span
                    title="deleteTeam"
                    className="self-center absolute right-2 cursor-pointer"
                    onClick={() => handleDeleteTeam(team.name)}
                  >
                    <FaTrashAlt />
                  </span>
                </div>
                <Team team={team} setUserTeamList={setUserTeamList} />
              </div>
            ))
          ) : (
            <h2>
              You currently have no teams. Try adding a new one to get started.
            </h2>
          )}
        </div>
      </div>
    </main>
  );
};

Dashboard.auth = {
  restricted: true,
};

export default Dashboard;
