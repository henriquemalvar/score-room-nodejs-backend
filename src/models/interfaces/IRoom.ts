import { IUser } from "./IUser";
import { IVote } from "./IVote";
import { IRoomConfig } from "./IRoomConfig";

export interface IRoom {
  id: string;
  name: string;
  password: string;
  owner: IUser;
  participants: IUser[];
  votes: IVote[];
  voteOptions: { value: number; label: string }[];
  config: IRoomConfig;
  calculatedValue: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
