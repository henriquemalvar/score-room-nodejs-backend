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
    .catch((err) => res.status(500).json({ message: err.message }));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const auth = new AuthServices();

  const isPasswordValid = await auth.comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = auth.generateToken(user.id);
  const userWithoutPassword = { ...user, password: undefined };

  return res.status(200).json({ token, user: userWithoutPassword });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as unknown as User;
  const user = await AppDataSource.getRepository(User)
    .findOne({
      where: { email },
    })
    .then((user: any) => user)
    .catch((err) => res.status(500).json({ message: err.message }));

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new User();
  const auth = new AuthServices();

  newUser.name = name;
  newUser.email = email;
  newUser.password = await auth.hashPassword(password);

  await AppDataSource.getRepository(User).save(newUser);

  const { password: _, ...newUserWithoutPassword } = newUser;

  return res.status(201).json(newUserWithoutPassword);
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
    return res.status(404).json({ message: "User not found" });
  }
  const auth = new AuthServices();

  const token = auth.generateToken(user.id);

  const sendEmail = auth.sendEmail(email, token);

  if (!sendEmail) {
    return res.status(500).json({ message: "Email not sent" });
  }

  return res.status(200).json({ message: "Email sent" });
};
