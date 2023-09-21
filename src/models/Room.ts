import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './User';
import { Vote } from './Vote';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  visibility: 'public' | 'private';

  @ManyToOne(() => User, (user) => user.roomsOwned)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Vote, (vote) => vote.room)
  votes: Vote[];
}
