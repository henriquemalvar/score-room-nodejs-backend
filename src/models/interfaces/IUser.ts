import { IRoom } from "./IRoom";
import { IVote } from "./IVote";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  enabled: boolean;
  roomsParticipated: IRoom[];
  votes: IVote[];
  roomsOwned: IRoom[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
