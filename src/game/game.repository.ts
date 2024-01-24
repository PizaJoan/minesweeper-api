import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Game } from './game.model';

@Injectable()
export class GameRepository {
  constructor(@InjectModel(Game) private gameModel: typeof Game) {}

  async getHello() {
    const result = await this.gameModel.findOne();

    console.log(result);

    return result;
  }
}
