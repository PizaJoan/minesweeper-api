export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  custom = 'custom',
}

export interface CreateBoardDTO {
  rows: number;
  cols: number;
  difficulty: Difficulty;
  board: number[][];
}
