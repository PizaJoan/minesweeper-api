import { Difficulty } from 'src/board/board.types';

export const MINES: Record<Difficulty, number> = {
  [Difficulty.easy]: 10,
  [Difficulty.medium]: 40,
  [Difficulty.hard]: 99,
  [Difficulty.custom]: 320,
};
