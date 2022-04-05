// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import pokemonData from "../../../src/pokemonData.json";
import { prisma } from "../../../../src/prismaConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).json({ message: "You are not logged in" });
  }
  await prisma.pokemonOnTeams.delete({
    where: {
      id: req.body.pokemonOnTeamId,
    },
  });

  res.status(200).json({ message: `Pokemon was released into the wild.` });
}
