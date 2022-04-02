import Image from "next/image";
import React, { useEffect } from "react";
import { prisma } from "../../src/prismaConnect";
import { Pokemon } from "../../src/globalTypes";
import { getSession, useSession } from "next-auth/react";
import TeamModal from "../../components/TeamModal";

export async function getStaticPaths() {
  const pokemonData = await prisma.pokemon.findMany({});

  const paths = pokemonData.map((pokemon) => ({
    params: {
      id: String(pokemon.id),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  // console.log(context);
  const pokemon = await prisma?.pokemon.findUnique({
    where: {
      id: Number(context.params.id),
    },
    include: {
      primaryTypeRelation: true,
      secondaryTypeRelation: true,
    },
  });

  return {
    props: {
      pokemon,
    }, // will be passed to the page component as props
  };
}

// interface Props {
//   pokemon: Pokemon;
// }

const PokemonOverview = ({ pokemon }: { pokemon: Pokemon }) => {
  // console.log(pokemon);
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [teamSelected, setTeamSelected] = React.useState(null);
  const [userTeams, setUserTeams] = React.useState(null);

  useEffect(() => {
    const getUserTeams = async () => {
      const res = await fetch("/api/user/getUserTeams");
      const data = await res.json();
      setUserTeams(data.userTeams);
    };
    if (!userTeams) {
      getUserTeams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToTeam = async () => {
    // fetch api route to save pokemon to team
    setModalIsOpen(true);
    if (teamSelected) {
      const data = {
        pokemonId: pokemon.id,
        name: teamSelected,
      };
      await fetch("/api/pokemon/team/addToTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setTeamSelected(null);
    }
  };

  return (
    <div className="md:grid grid-cols-2 gap-10 my-10">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold ">{pokemon?.name}</h1>
        <Image
          src={`/assets/images/${pokemon?.name.toLowerCase()}.jpg`}
          alt={pokemon?.name}
          width={600}
          height={600}
        />
      </div>
      <div className="pl-6">
        <h2 className="text-lg font-bold mb-4">Info</h2>
        <div className="flex">
          <h3 className="mb-6 font-semibold mr-2">Type:</h3>
          <ul className="flex gap-1">
            <li>
              {pokemon?.primaryTypeRelation?.type}
              {pokemon?.secondaryTypeRelation &&
                `, ${pokemon?.secondaryTypeRelation?.type}`}
            </li>
          </ul>
        </div>
        <div className="flex gap-10 lg:gap-20">
          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold">Stats</h3>
            <ul className="space-y-1">
              <li>hp: {pokemon?.hp}</li>
              <li>attack: {pokemon?.attack}</li>
              <li>defense: {pokemon?.defense}</li>
              <li>special_attack: {pokemon?.special_attack}</li>
              <li>special_defense: {pokemon?.special_defense}</li>
              <li>speed: {pokemon?.speed}</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Translations</h3>
            <ul className="space-y-1">
              <li>english: {pokemon?.name}</li>
              <li> japanese: {pokemon?.japanese_name}</li>
              <li> chinese: {pokemon?.chinese_name}</li>
              <li> french: {pokemon?.french_name}</li>
            </ul>
          </div>
        </div>
        {status === "authenticated" && (
          <button
            onClick={() => handleAddToTeam()}
            className="mt-8 p-2 bg-gray-800 text-white rounded-md"
          >
            Add to team
          </button>
        )}
      </div>
      <TeamModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        session={session}
        setTeamSelected={setTeamSelected}
        userTeams={userTeams}
      />
    </div>
  );
};

export default PokemonOverview;
