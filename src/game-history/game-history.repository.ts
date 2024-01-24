import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GameHistory } from './game-history.model';

@Injectable()
export class GameHistoryRepository {
  constructor(
    @InjectModel(GameHistory) private gameHistoryModel: typeof GameHistory,
  ) {}

  async getHello() {
    const result = await this.gameHistoryModel.findOne();

    console.log(result);

    return result;
  }
}
