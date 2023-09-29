import { Request, Response } from "express";
import { Vote } from "../../../models/Vote";
import { AppDataSource } from "../../../data-source";
import AppError from "../../../utils/custom-error/appError";
import { User } from "../../../models/User";
import { Room } from "../../../models/Room";

export const paginateVotes = async (request: Request, response: Response) => {
  try {
    const { page, limit, filters } = request.query as unknown as {
      page: number;
      limit: number;
      filters: any;
    };
    const repository = AppDataSource.getRepository(Vote);
    const votes = await repository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });
    return response.status(200).json({
      data: votes,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const getVote = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Vote);
    const vote = await repository.findOne({ where: { id } });
    return response.status(200).json({
      data: vote,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const createVote = async (request: Request, response: Response) => {
  try {
    const { room, user, value } = request.body as unknown as {
      room: string;
      user: string;
      value: number;
    };
    const repository = AppDataSource.getRepository(Vote);
    const userRepository = AppDataSource.getRepository(User);
    const roomRepository = AppDataSource.getRepository(Room);
    const userExists = await userRepository.findOne({ where: { id: user } });
    const roomExists = await roomRepository.findOne({ where: { id: room } });
    if (!userExists) {
      throw new AppError("User not found", 404);
    }
    if (!roomExists) {
      throw new AppError("Room not found", 404);
    }
    const vote = repository.create({
      room: roomExists,
      user: userExists,
      value,
    });
    await repository.save(vote);
    return response.status(201).json({
      data: vote,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const updateVote = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { room, user, value } = request.body as unknown as {
      room: string;
      user: string;
      value: number;
    };
    const repository = AppDataSource.getRepository(Vote);
    const userRepository = AppDataSource.getRepository(User);
    const roomRepository = AppDataSource.getRepository(Room);
    const voteExists = await repository.findOne({ where: { id } });
    if (!voteExists) {
      throw new AppError("Vote not found", 404);
    }
    const userExists = await userRepository.findOne({ where: { id: user } });
    const roomExists = await roomRepository.findOne({ where: { id: room } });
    if (!userExists) {
      throw new AppError("User not found", 404);
    }
    if (!roomExists) {
      throw new AppError("Room not found", 404);
    }
    const vote = repository.create({
      id,
      room: roomExists,
      user: userExists,
      value,
    });
    await repository.save(vote);
    return response.status(200).json({
      data: vote,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const getVotesByRoom = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Vote);
    const room = await AppDataSource.getRepository(Room).findOne({
      where: { id },
    });
    const votes = await repository.find({ where: { room: { id } } });
    return response.status(200).json({
      data: votes,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const getVotesByUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Vote);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });
    let votes: any[];
    if (user) {
      votes = await repository.find({ where: { user } });
    } else {
      votes = [];
    }
    return response.status(200).json({
      data: votes,
    });
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
export const deleteVote = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const repository = AppDataSource.getRepository(Vote);
    const voteExists = await repository.findOne({ where: { id } });
    if (!voteExists) {
      throw new AppError("Vote not found", 404);
    }
    await repository.delete(id);
    return response.status(204).json();
  } catch (error) {
    throw new AppError("Internal server error", 500);
  }
};
