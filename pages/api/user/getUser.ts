// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/prismaConnect";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(200).json({ message: "You are not logged in" });
  }
  const user = await prisma.user.findUnique({
    where: { email: String(session?.user?.email) },
  });
  if (!user) {
    return res.status(200).json({ message: "User not found" });
  }
  res.status(200).json({ session });
}
