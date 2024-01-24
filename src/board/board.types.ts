export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  custom = 'custom',
}

export interface Cell {
  num: number;
  isFlag?: boolean;
}

export interface CreateBoardDTO {
  rows: number;
  cols: number;
  difficulty: Difficulty;
  board: Cell[][];
}
