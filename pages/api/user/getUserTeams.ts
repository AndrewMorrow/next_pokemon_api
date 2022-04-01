// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../src/prismaConnect";
// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
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

  res.status(200).json({ userTeams });
}
