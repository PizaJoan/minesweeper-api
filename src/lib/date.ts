import { YEAR } from 'src/constants/miliseconds';

export const createDate = (addTime: number = YEAR) =>
  new Date(Date.now() + addTime);
