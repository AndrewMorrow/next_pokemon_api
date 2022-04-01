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

  const team = await prisma.team.findUnique({
    where: { name: req.body.name },
    include: {
      pokemon: true,
    },
  });
  console.log(team);
  // if (team) {
  //   const updateTeam = await prisma.user.update({
  //     where: {
  //       id: user?.id,
  //     },
  //     data: {
  //       teams: {
  //         where: {
  //           name: req.body.teamName,
  //         },
  //       },
  //     },
  //   });
  //   // console.log(" user", user);

  //   res.status(200).json(newTeam);
  // }
}
