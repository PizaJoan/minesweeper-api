import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Board } from './board.model';
import { CreateBoardDTO } from './board.types';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async createBoard({ rows, cols, board, difficulty }: CreateBoardDTO) {
    const result = await this.boardModel.create({
      rows,
      cols,
      jsonBoard: board,
      difficulty,
    });

    console.log(result);

    return result;
  }
}
