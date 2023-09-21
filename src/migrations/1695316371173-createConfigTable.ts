import { MigrationInterface, QueryRunner, Table } from "typeorm";
/* 
@Entity()
export class RoomConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Room, (room) => room.config)
  room: Room;

  @Column()
  visibility: 'public' | 'private';

  // Configurações de votos
  @Column()
  voteType: 'single' | 'multiple';

  @Column()
  voteVisibility: 'public' | 'private';

  @Column()
  voteTime: number;

  @Column()
  voteTimeType: 'seconds' | 'minutes' | 'hours' | 'days';

  @Column()
  voteAutoClose: boolean;

  // Configurações de cálculo
  @Column()
  calculateVotes: boolean;

  @Column({ type: 'enum', enum: ['average', 'mode', 'median'] })
  calculateType: 'average' | 'mode' | 'median';

  @Column({ type: 'enum', enum: ['up', 'down', 'nearest'] })
  calculateRound: 'up' | 'down' | 'nearest';

  @Column()
  calculatePrecision: number;
} */

export class CreateConfigTable1695316371173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "config",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "visibility",
            type: "varchar",
          },
          {
            name: "voteType",
            type: "varchar",
          },
          {
            name: "voteVisibility",
            type: "varchar",
          },
          {
            name: "voteTime",
            type: "int",
          },
          {
            name: "voteTimeType",
            type: "varchar",
          },
          {
            name: "voteAutoClose",
            type: "boolean",
          },
          {
            name: "calculateVotes",
            type: "boolean",
          },
          {
            name: "calculateType",
            type: "varchar",
          },
          {
            name: "calculateRound",
            type: "varchar",
          },
          {
            name: "calculatePrecision",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("config");
  }
}
