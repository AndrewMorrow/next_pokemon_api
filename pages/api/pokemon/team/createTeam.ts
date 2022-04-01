// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../src/prismaConnect";

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  // console.log("session", session);
  const user = await prisma.user.findUnique({
    where: { email: String(session?.user?.email) },
  });
  console.log("teamName", req.body.teamName);
  if (user?.id) {
    const newTeam = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        teams: {
          create: {
            name: req.body.teamName,
          },
        },
      },
    });

    res.status(200).json(newTeam);
  }
}
