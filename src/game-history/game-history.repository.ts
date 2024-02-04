import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Game } from 'src/game/game.model';
import { PlayDTO } from 'src/game/game.types';
import { GameHistory } from './game-history.model';

@Injectable()
export class GameHistoryRepository {
  constructor(
    @InjectModel(GameHistory) private gameHistoryModel: typeof GameHistory,
  ) {}

  async addHistory(game: Game, cell: PlayDTO) {
    return await this.gameHistoryModel.create({
      gameId: game.id,
      selectedRow: cell.row,
      selectedCol: cell.col,
      bomb: cell.bomb,
    });
  }

  async findByGameId(gameId: number, cell: PlayDTO) {
    return await this.gameHistoryModel.findOne({
      where: {
        gameId: gameId,
        selectedRow: cell.row,
        selectedCol: cell.col,
      },
    });
  }

  async getHistory(game: Game) {
    return await this.gameHistoryModel.findAndCountAll({
      where: {
        gameId: game.id,
        bomb: false,
      },
    });
  }
}
