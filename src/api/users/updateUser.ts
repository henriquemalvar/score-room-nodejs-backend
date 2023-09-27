import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params as unknown as { id: string };
    const { name, email, password } = request.body as unknown as {
      name: string;
      email: string;
      password: string;
    };
    const repository = AppDataSource.getRepository(User);
    const user = await repository.findBy({ id }).then((user: any) => user);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    user.name = name;
    user.email = email;
    user.password = password;
    const result = await repository.save(user);
    return response.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
