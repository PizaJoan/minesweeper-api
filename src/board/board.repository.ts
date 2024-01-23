import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './board.model';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board) private boardModel: typeof Board) {}

  async getHello() {
    const result = await this.boardModel.findOne();

    console.log(result);

    return result;
  }
}
