import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Board } from './board.model';
import { CreateBoardDTO } from './board.types';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async createBoard({ rows, cols, mines, board, difficulty }: CreateBoardDTO) {
    const result = await this.boardModel.create({
      rows,
      cols,
      mines,
      jsonBoard: board,
      difficulty,
    });

    return result;
  }
}
