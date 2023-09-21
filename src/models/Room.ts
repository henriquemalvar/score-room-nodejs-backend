import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";
import { RoomConfig } from "./Config";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToOne(() => User, (user) => user.roomsOwned)
  owner: User;

  @ManyToMany(() => User, (user) => user.roomsParticipated)
  participants: User[];

  @OneToMany(() => Vote, (vote) => vote.room)
  votes: Vote[];

  @Column("jsonb")
  voteOptions: { value: number; label: string }[];

  @OneToOne(() => RoomConfig, (config) => config.room, { cascade: true })
  config: RoomConfig;

  @Column({ type: "float", nullable: true })
  calculatedValue: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
