import { Injectable } from '@nestjs/common';

import { Board } from 'src/board/board.model';
import { UserService } from 'src/user/user.service';
import { Game } from './game.model';
import { GameRepository } from './game.repository';
import { PlayDTO, Status } from './game.types';

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private userService: UserService,
  ) {}

  async findById(gameId: number) {
    return await this.gameRepository.findById(gameId);
  }

  async findByIdWithBoard(gameId: number) {
    return await this.gameRepository.findById(gameId, { includeGame: true });
  }

  async initGame(userId: number, board: Board) {
    const game = await this.gameRepository.initGame(
      (await this.userService.findById(userId))!,
      board,
    );

    return game;
  }

  async play(game: Game, cell: PlayDTO) {
    game.status = cell.bomb ? Status.lost : Status.draft;
    game.time = Math.round((Date.now() - Number(game!.creationDate)) / 1000);

    return await game.save();
  }
}
