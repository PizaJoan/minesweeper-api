export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  custom = 'custom',
}

export interface Cell {
  num: number;
  isFlag: boolean;
  revealed: boolean;
}
