import { Room } from "../Room";

export interface IRoomConfig {
  id: string;
  room: Room;
  visibility: "public" | "private";
  voteType: "single" | "multiple";
  voteVisibility: "public" | "private";
  voteTime: number;
  voteTimeType: "seconds" | "minutes" | "hours" | "days";
  voteAutoClose: boolean;
  calculateVotes: boolean;
  calculateType: "average" | "mode" | "median";
  calculateRound: "up" | "down" | "nearest";
  calculatePrecision: number;
}
