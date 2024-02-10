export enum Difficulty {
  easy = 'EASY',
  medium = 'MEDIUM',
  hard = 'HARD',
  custom = 'CUSTOM',
}

export interface CreateBoardDTO {
  rows: number;
  cols: number;
  mines: number;
  difficulty: Difficulty;
  board: number[][];
}
