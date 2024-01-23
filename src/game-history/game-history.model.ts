import {
  Model,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Game } from 'src/game/game.model';

@Table({ tableName: 'game_history', createdAt: false, updatedAt: false })
export class GameHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Game)
  @Column({ field: 'game_id' })
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;

  @Column({ field: 'selected_row', defaultValue: 9 })
  selectedRow: number;

  @Column({ field: 'selected_col', defaultValue: 9 })
  selectedCol: number;

  @Column
  bomb: boolean;

  @Column({ field: 'creation_date', defaultValue: Date.now() })
  creationDate: Date;
}
