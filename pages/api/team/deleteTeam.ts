// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import pokemonData from "../../../src/pokemonData.json";
import { prisma } from "../../../src/prismaConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200).json({ message: "You are not logged in" });
  }
  await prisma.user.update({
    where: { email: session?.user?.email as string },
    data: {
      teams: {
        deleteMany: [{ name: req.body.teamName }],
      },
    },
  });

  res.status(200).json({ message: `Team ${req.body.teamName} deleted` });
}
