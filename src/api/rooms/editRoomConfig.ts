import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { RoomConfig } from "../../models/Config";
import { Room } from "../../models/Room";
import { IRoomConfig } from "../../models/interfaces/IRoomConfig";
import AppError from "../../utils/custom-error/appError";

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
    throw new AppError("Internal server error", 500);
  }
};
