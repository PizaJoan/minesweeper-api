import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Cell, Difficulty } from './board.types';
import { MINES } from 'src/constants/board/mines';
import { COLS, ROWS } from 'src/constants/board/size';
import { Board } from './board.model';
import { BOMB_PROXIMITY } from 'src/constants/board/bomb-proximity';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async initBoard(difficulty: Difficulty): Promise<Board>;
  async initBoard(
    difficulty: Difficulty,
    rows?: number,
    cols?: number,
  ): Promise<Board> {
    const [boardRows, boardCols] =
      difficulty !== Difficulty.custom
        ? this.getBoardSize(difficulty)
        : [Number(rows), Number(cols)];

    const emptyBoard = this.getBoardEmptyBoard(boardRows, boardCols);

    const mines = this.getMines(difficulty, rows, cols);
    const board = this.fillBoard(emptyBoard, mines);

    return await this.boardRepository.createBoard({
      rows: boardRows,
      cols: boardCols,
      difficulty,
      board,
    });
  }

  private getBoardSize(difficulty: Difficulty): [number, number] {
    return [ROWS[difficulty], COLS[difficulty]];
  }

  private getBoardEmptyBoard(rows: number, cols: number): Cell[][] {
    return Array<Cell[]>(cols)
      .fill([])
      .map(() =>
        Array<Cell>(rows)
          .fill({ num: 0 })
          .map(() => ({ num: 0 })),
      );
  }

  private getMines(
    difficulty: Difficulty,
    rows: number = ROWS[difficulty],
    cols: number = COLS[difficulty],
  ): number {
    if (difficulty === Difficulty.custom) {
      return Math.round((cols * rows) / 5);
    }

    return MINES[difficulty];
  }

  private fillBoard(board: Cell[][], mines: number): Cell[][] {
    let counter = 0;

    while (counter < mines) {
      const firstNum = Math.floor(Math.random() * board.length);
      const secondNum = Math.floor(Math.random() * board[0].length);

      if (!isNaN(board[firstNum][secondNum].num)) {
        board[firstNum][secondNum].num = NaN;

        for (let i = 0; i < BOMB_PROXIMITY.length; i++) {
          const [row, col] = BOMB_PROXIMITY[i];

          const cell = board[firstNum + row][secondNum + col];

          if (cell && !isNaN(cell.num)) {
            cell.num++;
          }
        }

        counter++;
      }
    }

    return board;
  }
}
