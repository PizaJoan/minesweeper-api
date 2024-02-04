import { DataTypes } from 'sequelize';
import {
  AutoIncrement,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Game } from 'src/game/game.model';
import { Difficulty } from './board.types';

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

  @Column({ defaultValue: 10 })
  mines: number;

  @Column(DataTypes.ENUM(typeof Difficulty))
  difficulty: Difficulty;

  @Column({ field: 'json_board', type: DataTypes.JSON })
  jsonBoard: number[][];

  @HasOne(() => Game)
  game: Game;
}
