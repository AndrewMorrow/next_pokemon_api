import Image from "next/image";
import React, { useEffect } from "react";
import { prisma } from "../../src/prismaConnect";
import { Pokemon } from "../../src/globalTypes";
import { useSession } from "next-auth/react";
import TeamModal from "../../components/TeamModal";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import SuccessMessage from "../../components/SuccessMessage";

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
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

  return (
    <>
      <Link href="/" passHref>
        <button className="flex items-center mt-2 p-2 bg-gray-800 text-white rounded-md">
          <FiArrowLeft className="mr-1" /> Return to Pokemon
        </button>
      </Link>
      <div className="md:grid grid-cols-2 gap-10 my-10">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold ">{pokemon?.name}</h1>
          <Image
            src={`/assets/images/${pokemon?.name.toLowerCase()}.jpg`}
            alt={pokemon?.name}
            width={500}
            height={500}
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
              onClick={() => setModalIsOpen(true)}
              className="mt-8 p-2 bg-gray-800 text-white rounded-md"
            >
              Add to team
            </button>
          )}
        </div>
        <TeamModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          pokemon={pokemon}
          setIsShown={setIsShown}
        />
      </div>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <SuccessMessage isShown={isShown} setIsShown={setIsShown} />
        </div>
      </div>
    </>
  );
};

export default PokemonOverview;
