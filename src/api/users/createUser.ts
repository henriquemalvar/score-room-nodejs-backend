import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body as unknown as {
      name: string;
      email: string;
      password: string;
    };
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const repository = AppDataSource.getRepository(User);

    const emailExists = await repository.findOne({ where: { email } });
    if (emailExists) {
      throw new AppError("Email already exists", 400);
    }

    const result = await repository.save(user);
    return response.status(201).json({
      data: result,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
