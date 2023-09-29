import { Request, Response } from "express";
import { User } from "../../../models/User";
import AppError from "../../../utils/custom-error/appError";
import { AppDataSource } from "../../../data-source";
import { AuthServices } from "../AuthServices";

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
