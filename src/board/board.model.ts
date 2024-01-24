import { DataTypes } from 'sequelize';
import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  HasOne,
} from 'sequelize-typescript';
import { Difficulty } from './board.types';
import { Game } from 'src/game/game.model';

@Table({ tableName: 'board', createdAt: false, updatedAt: false })
export class Board extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ defaultValue: 9 })
  rows: number;

  @Column({ defaultValue: 9 })
  cols: number;

  @Column(DataTypes.ENUM(typeof Difficulty))
  difficulty: Difficulty;

  @Column({ field: 'json_board', type: DataTypes.JSON })
  jsonBoard: number[][];

  @HasOne(() => Game)
  game: Game;
}
