import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Board } from 'src/board/board.model';
import { GameHistory } from 'src/game-history/game-history.model';
import { User } from 'src/user/user.model';
import { Status } from './game.types';

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

  @Column({ field: 'creation_date', defaultValue: Date.now() })
  creationDate: Date;

  @Column({ defaultValue: 0 })
  time: number;

  @Column({ type: DataTypes.ENUM(typeof Status) })
  status: Status;

  @Column({ defaultValue: 0 })
  score: number;
}
