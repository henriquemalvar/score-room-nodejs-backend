import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../models/User";
import AppError from "../../../utils/custom-error/appError";

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

export const getUsers = async (request: Request, response: Response) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find();
    return response.status(200).json({
      data: users,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
}

export const paginateUsers = async (request: Request, response: Response) => {
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
