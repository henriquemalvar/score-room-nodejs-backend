import { Request, Response } from "express";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { Room } from "../../models/Room";

export const getRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: string };
    const repository = AppDataSource.getRepository(Room);
    const room = await repository.findOne({ where: { id } });
    return res.status(200).json({
      data: room,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
