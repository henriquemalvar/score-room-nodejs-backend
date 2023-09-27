import { Request, Response } from "express";
import AppError from "../../utils/custom-error/appError";
import { AppDataSource } from "../../data-source";
import { Room } from "../../models/Room";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, password, voteOptions } = req.body as unknown as {
      name: string;
      password: string;
      voteOptions: any[];
    };
    const repository = AppDataSource.getRepository(Room);
    const room = new Room();
    room.name = name;
    room.password = password;
    room.voteOptions = voteOptions;
    const result = await repository.save(room);
    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
