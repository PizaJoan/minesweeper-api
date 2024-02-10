import { Difficulty } from 'src/board/board.types';
import { UserDTO } from 'src/user/user.types';

export enum Status {
  created = 'created',
  draft = 'draft',
  won = 'won',
  lost = 'lost',
}

export interface InitGameDTO extends UserDTO {
  difficulty: Difficulty;
  rows?: number;
  cols?: number;
}

export interface PlayDTO extends UserDTO {
  gameId: number;
  row: number;
  col: number;
  bomb?: boolean;
}
