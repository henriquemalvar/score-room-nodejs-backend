import { Request, Response } from "express";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { AuthServices } from "./AuthServices";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as unknown as User;
  const user = await AppDataSource.getRepository(User)
    .findOne({
      where: { email },
    })
    .then((user: any) => user)
    .catch((err) => new AppError(err.message, 500));

  if (user) {
    throw new AppError("User already exists", 409);
  }

  const newUser = new User();
  const auth = new AuthServices();

  newUser.name = name;
  newUser.email = email;
  newUser.password = await auth.hashPassword(password);

  await AppDataSource.getRepository(User).save(newUser);

  res.status(201).json(newUser);
};
