import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { RoomConfig } from "../../../models/Config";
import { Room } from "../../../models/Room";
import { IRoomConfig } from "../../../models/interfaces/IRoomConfig";
import AppError from "../../../utils/custom-error/appError";
import { User } from "../../../models/User";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { owner, name, password, voteOptions } = req.body as unknown as {
      owner: string;
      name: string;
      password: string;
      voteOptions: any[];
    };
    const repository = AppDataSource.getRepository(Room);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: owner },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const room = new Room();
    room.name = name;
    room.password = password;
    room.voteOptions = voteOptions;
    room.owner = user;
    const result = await repository.save(room);
    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as { id: string };
    const repository = AppDataSource.getRepository(Room);
    const room = await repository.findOne({ where: { id } });
    return res.status(200).json({
      data: room,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
      data: rooms[0],
      page,
      limit,
      total: rooms[1],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editRoomConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      visibility,
      voteType,
      voteVisibility,
      voteTime,
      voteTimeType,
      voteAutoClose,
      calculateVotes,
      calculateType,
      calculateRound,
      calculatePrecision,
    } = req.body as unknown as IRoomConfig;
    const repository = AppDataSource.getRepository(Room);
    const room = await repository.findOne({ where: { id } });
    if (!room) {
      throw new AppError("Room not found", 404);
    }
    const roomConfigRepository = AppDataSource.getRepository(RoomConfig);
    const roomConfig = await roomConfigRepository.findOne({
      where: { room },
    });
    if (!roomConfig) {
      const newRoomConfig = new RoomConfig();
      newRoomConfig.room = room;
      newRoomConfig.visibility = visibility;
      newRoomConfig.voteType = voteType;
      newRoomConfig.voteVisibility = voteVisibility;
      newRoomConfig.voteTime = voteTime;
      newRoomConfig.voteTimeType = voteTimeType;
      newRoomConfig.voteAutoClose = voteAutoClose;
      newRoomConfig.calculateVotes = calculateVotes;
      newRoomConfig.calculateType = calculateType;
      newRoomConfig.calculateRound = calculateRound;
      newRoomConfig.calculatePrecision = calculatePrecision;
      await roomConfigRepository.save(newRoomConfig);
      return res.status(200).json({
        data: newRoomConfig,
      });
    }
    roomConfig.visibility = visibility;
    roomConfig.voteType = voteType;
    roomConfig.voteVisibility = voteVisibility;
    roomConfig.voteTime = voteTime;
    roomConfig.voteTimeType = voteTimeType;
    roomConfig.voteAutoClose = voteAutoClose;
    roomConfig.calculateVotes = calculateVotes;
    roomConfig.calculateType = calculateType;
    roomConfig.calculateRound = calculateRound;
    roomConfig.calculatePrecision = calculatePrecision;
    await roomConfigRepository.save(roomConfig);
    return res.status(200).json({
      data: roomConfig,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
