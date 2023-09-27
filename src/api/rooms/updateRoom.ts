import { Request, Response } from "express";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { Room } from "../../models/Room";

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: string };
    const { name, password, voteOptions } = req.body as unknown as {
      name: string;
      password: string;
      voteOptions: any[];
    };
    const repository = AppDataSource.getRepository(Room);
    const room = await repository
      .findOne({ where: { id } })
      .then((room: any) => room)
      .catch((error: any) => error);
    room.name = name;
    room.password = password;
    room.voteOptions = voteOptions;
    const result = await repository.save(room);
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
