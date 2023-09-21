import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
} from "typeorm";
import { Room } from "./Room";

@Entity()
export class RoomConfig {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Room, (room) => room.config)
  room: Room;

  @Column()
  visibility: "public" | "private";

  @Column()
  voteType: "single" | "multiple";

  @Column()
  voteVisibility: "public" | "private";

  @Column()
  voteTime: number;

  @Column()
  voteTimeType: "seconds" | "minutes" | "hours" | "days";

  @Column()
  voteAutoClose: boolean;

  @Column()
  calculateVotes: boolean;

  @Column({ type: "enum", enum: ["average", "mode", "median"] })
  calculateType: "average" | "mode" | "median";

  @Column({ type: "enum", enum: ["up", "down", "nearest"] })
  calculateRound: "up" | "down" | "nearest";

  @Column()
  calculatePrecision: number;
}
