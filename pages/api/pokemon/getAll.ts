// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import pokemonData from "../../../src/pokemonData.json";
import { prisma } from "../../../src/prismaConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pokemonData = await prisma.pokemon.findMany({
    include: {
      primaryTypeRelation: true,
      secondaryTypeRelation: true,
    },
  });

  res.status(200).json(JSON.stringify(pokemonData));
}
