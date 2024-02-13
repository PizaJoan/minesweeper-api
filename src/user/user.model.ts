import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Game } from 'src/game/game.model';

@Table({ tableName: 'user', createdAt: false, updatedAt: false })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({ field: 'creation_date', defaultValue: Date.now() })
  creationDate: Date;

  @HasMany(() => Game)
  games: Game[];
}
