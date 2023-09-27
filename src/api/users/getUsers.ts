import { Response, Request } from "express";
import { User } from "../../models/User";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const { page, perPage, filters } = request.query as unknown as {
      page: number;
      perPage: number;
      filters: any;
    };
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find({
      where: filters ? filters : {},
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return response.status(200).json({
      data: users,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
