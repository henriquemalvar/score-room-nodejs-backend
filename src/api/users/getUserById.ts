import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";

export const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params as unknown as { id: string };
    const repository = AppDataSource.getRepository(User);
    const user = await repository.findBy({ id });
    return response.status(200).json({
      data: user,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
