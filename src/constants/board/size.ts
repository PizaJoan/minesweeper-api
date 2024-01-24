import { Difficulty } from 'src/board/board.types';

export const COLS: Record<Difficulty, number> = {
  [Difficulty.easy]: 9,
  [Difficulty.medium]: 16,
  [Difficulty.hard]: 30,
  [Difficulty.custom]: 40,
};

export const ROWS: Record<Difficulty, number> = {
  [Difficulty.easy]: 9,
  [Difficulty.medium]: 16,
  [Difficulty.hard]: 16,
  [Difficulty.custom]: 40,
};
