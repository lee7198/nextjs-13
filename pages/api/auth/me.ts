import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };
  if (payload.email)
    return res.status(401).json({ errorMessage: "Unauthorized" });

  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!userData) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }

  return res.json({
    id: userData?.id,
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    phone: userData?.phone,
    city: userData?.city,
  });
}
