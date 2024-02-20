import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Game } from 'src/game/game.model';
import { PlayBulkCells, PlayDTO } from 'src/game/game.types';
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

  async addHistoryBulk(game: Game, cells: PlayBulkCells) {
    return await this.gameHistoryModel.bulkCreate(
      cells.map((cell) => ({
        gameId: game.id,
        selectedRow: cell.row,
        selectedCol: cell.col,
        bomb: cell.bomb,
      })),
    );
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

  async findByGameIdBulk(gameId: number, cells: PlayBulkCells) {
    return await this.gameHistoryModel.findAndCountAll({
      where: {
        gameId: gameId,
        [Op.or]: cells.map((cell) => ({
          [Op.and]: { selectedRow: cell.row, selectedCol: cell.col },
        })),
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
