import { Difficulty } from 'src/board/board.types';

export const POINTS_MULTIPLIERS = {
  [Difficulty.easy]: 100,
  [Difficulty.medium]: 150,
  [Difficulty.hard]: 200,
  [Difficulty.custom]: 250,
};
