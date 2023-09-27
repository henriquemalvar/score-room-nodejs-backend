import { Request, Response } from "express";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { Room } from "../../models/Room";

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: string };
    const repository = AppDataSource.getRepository(Room);
    const room = await repository
      .findOne({ where: { id } })
      .then((room: any) => room)
      .catch((error: any) => error);
    const result = await repository.softDelete(room);
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
