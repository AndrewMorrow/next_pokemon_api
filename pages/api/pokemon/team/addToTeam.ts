// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../src/prismaConnect";

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const team = await prisma.team.findUnique({
    where: { name: req.body.name },
    include: {
      pokemon: true,
    },
  });

  if (team) {
    const updateTeam = await prisma.pokemonOnTeams.create({
      data: {
        pokemon: {
          connect: {
            id: req.body.pokemonId,
          },
        },
        team: {
          connect: {
            id: team.id,
          },
        },
      },
    });
    res.status(200).json(updateTeam);
  }
}
