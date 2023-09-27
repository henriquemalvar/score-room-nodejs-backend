import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Room, (room) => room.votes)
  room: Room;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Column("float")
  value: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
