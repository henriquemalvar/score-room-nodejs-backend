import { Request, Response } from "express";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { AuthServices } from "./AuthServices";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await AppDataSource.getRepository(User)
    .findOne({
      where: { email },
    })
    .then((user: any) => user)
    .catch((err) => new AppError(err.message, 500));

  if (!user) {
    throw new AppError("User not found", 404);
  }
  const auth = new AuthServices();

  const token = auth.generateToken(user.id);

  const sendEmail = auth.sendEmail(email, token);

  if (!sendEmail) {
    throw new AppError("Email could not be sent", 500);
  }

  res.status(200).json({ message: "Email sent" });
};
