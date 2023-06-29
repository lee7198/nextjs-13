import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, phone, city } = req.body;
    const errors: string[] = [];
    const validatationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name must be between 1 and 20 characters",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name must be between 1 and 20 characters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is not valid",
      },
      {
        valid: validator.isLength(email, {
          min: 1,
        }),
        errorMessage: "City is not valid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not valid",
      },
    ];

    validatationSchema.forEach((check) => {
      if (!check.valid) errors.push(check.errorMessage);
    });

    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    res.status(200).json({
      hello: firstName,
    });
  }
}
