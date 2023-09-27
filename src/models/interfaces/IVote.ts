import { IRoom } from "./IRoom";
import { IUser } from "./IUser";

export interface IVote {
  id: string;
  room: IRoom;
  user: IUser;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
