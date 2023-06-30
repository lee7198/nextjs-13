import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Missing email or password");
    }
    const validatationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is not valid",
      },
    ];

    validatationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userWithEmail)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect" });

    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect" });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const token = await new jose.SignJWT({
      email: userWithEmail.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({
      token,
    });
  }
  return res.status(404).json("Unkown endpoint");
}
