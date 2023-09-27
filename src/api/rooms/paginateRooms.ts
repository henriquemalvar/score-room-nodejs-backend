import { Request, Response } from "express";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { Room } from "../../models/Room";

export const paginateRooms = async (req: Request, res: Response) => {
  try {
    const { page, limit, filters } = req.query as unknown as {
      page: number;
      limit: number;
      filters: any;
    };
    const repository = AppDataSource.getRepository(Room);
    const rooms = await repository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });
    return res.status(200).json({
      data: rooms,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
