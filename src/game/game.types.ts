import { Difficulty } from 'src/board/board.types';

export enum Status {
  created = 'created',
  draft = 'draft',
  won = 'won',
  lost = 'lost',
}

export interface InitGameDTO {
  difficulty: Difficulty;
  rows?: number;
  cols?: number;
}

export interface PlayDTO {
  row: number;
  col: number;
  bomb?: boolean;
}
