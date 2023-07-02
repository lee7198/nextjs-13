import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

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

    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userData)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect" });

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect." });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    const token = await new jose.SignJWT({
      email: userData.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("OpenTableJWT", token, { req, res, maxAge: 86400 });

    return res.status(200).json({
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      phone: userData.phone,
    });
  }
  return res.status(404).json("Unkown endpoint");
}
