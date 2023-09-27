import { Request, Response } from "express";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { AuthServices } from "./AuthServices";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AppDataSource.getRepository(User)
    .findOne({
      where: { email },
    })
    .then((user: any) => user)
    .catch((err) => new AppError(err.message, 500));

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const auth = new AuthServices();

  const isPasswordValid = await auth.comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = auth.generateToken(user.id);
  const userWithoutPassword = { ...user, password: undefined };

  res.status(200).json({ token, user: userWithoutPassword });
};
