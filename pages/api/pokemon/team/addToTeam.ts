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

  const user = await prisma.user.findUnique({
    where: { email: String(session?.user?.email) },
  });

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
    console.log(" user", user);

    res.status(200).json(newTeam);
  }
}
