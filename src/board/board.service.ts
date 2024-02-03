import { Injectable } from '@nestjs/common';

import { BOMB_PROXIMITY } from 'src/constants/board/bomb-proximity';
import { MINES, MINE_VALUE } from 'src/constants/board/mines';
import { COLS, ROWS } from 'src/constants/board/size';
import { InitGameDTO, PlayDTO } from 'src/game/game.types';
import { Board } from './board.model';
import { BoardRepository } from './board.repository';
import { Difficulty } from './board.types';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  checkBomb(board: Board, cell: PlayDTO) {
    return board.jsonBoard[cell.row][cell.col] === MINE_VALUE;
  }

  async initBoard({ difficulty, rows, cols }: InitGameDTO) {
    const [boardRows, boardCols] =
      difficulty !== Difficulty.custom
        ? this.getBoardSize(difficulty)
        : [Number(rows), Number(cols)];

    const mines = this.getMines(difficulty, rows, cols);
    const board = this.fillBoard(
      this.getBoardEmptyBoard(boardRows, boardCols),
      mines,
    );

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

  private getBoardEmptyBoard(rows: number, cols: number): number[][] {
    return Array<number[]>(rows)
      .fill([])
      .map(() =>
        Array<number>(cols)
          .fill(0)
          .map(() => 0),
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

  private fillBoard(board: number[][], mines: number): number[][] {
    let counter = 0;

    while (counter < mines) {
      const firstNum = Math.floor(Math.random() * board.length);
      const secondNum = Math.floor(Math.random() * board[0].length);

      if (board[firstNum][secondNum] !== -1) {
        board[firstNum][secondNum] = MINE_VALUE;

        for (let i = 0; i < BOMB_PROXIMITY.length; i++) {
          const [row, col] = BOMB_PROXIMITY[i];

          const cell = board[firstNum + row]?.[secondNum + col];

          if (cell >= 0) {
            board[firstNum + row]![secondNum + col]! += 1;
          }
        }

        counter++;
      }
    }

    return board;
  }
}
