import { DataTypes } from 'sequelize';
import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Status } from './game.types';
import { User } from 'src/user/user.model';
import { Board } from 'src/board/board.model';
import { GameHistory } from 'src/game-history/game-history.model';

@Table({ tableName: 'game', createdAt: false, updatedAt: false })
export class Game extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Board)
  @Column({ field: 'board_id' })
  boardId: number;

  @BelongsTo(() => Board)
  board: Board;

  @HasMany(() => GameHistory)
  history: GameHistory[];

  @Column({ defaultValue: 9 })
  rows: number;

  @Column({ defaultValue: 9 })
  cols: number;

  @Column({ defaultValue: 0 })
  time: number;

  @Column({ defaultValue: 0 })
  score: number;

  @Column({ type: DataTypes.ENUM(typeof Status) })
  status: Status;
}
