import { Injectable } from '@nestjs/common';

import { Game } from 'src/game/game.model';
import { PlayDTO } from 'src/game/game.types';
import { GameHistoryRepository } from './game-history.repository';

@Injectable()
export class GameHistoryService {
  constructor(private gameHistoryRepository: GameHistoryRepository) {}

  async addHistory(game: Game, cell: PlayDTO) {
    await this.gameHistoryRepository.addHistory(game, cell);
  }
}
