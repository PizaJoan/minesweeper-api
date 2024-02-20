import { Injectable } from '@nestjs/common';

import { Game } from 'src/game/game.model';
import { PlayBulkCells, PlayDTO } from 'src/game/game.types';
import { GameHistoryRepository } from './game-history.repository';

@Injectable()
export class GameHistoryService {
  constructor(private gameHistoryRepository: GameHistoryRepository) {}

  async addHistory(game: Game, cell: PlayDTO) {
    await this.gameHistoryRepository.addHistory(game, cell);
  }

  async addHistoryBulk(game: Game, cells: PlayBulkCells) {
    await this.gameHistoryRepository.addHistoryBulk(game, cells);
  }

  async alreadyPlayedCell(game: Game, cell: PlayDTO) {
    return !!(await this.gameHistoryRepository.findByGameId(game.id, cell));
  }

  async alreadyPlayedCells(game: Game, cells: PlayBulkCells) {
    return (
      (await this.gameHistoryRepository.findByGameIdBulk(game.id, cells))
        .count > 0
    );
  }

  async getHistory(game: Game) {
    return await this.gameHistoryRepository.getHistory(game);
  }
}
