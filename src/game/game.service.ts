import { Injectable } from '@nestjs/common';

import { Board } from 'src/board/board.model';
import { Difficulty } from 'src/board/board.types';
import { POINTS_MULTIPLIERS } from 'src/constants/game/points';
import { GameHistoryService } from 'src/game-history/game-history.service';
import { PaginationOptions } from 'src/types/pagination';
import { UserService } from 'src/user/user.service';
import { Game } from './game.model';
import { GameRepository } from './game.repository';
import { PlayBulkCells, PlayDTO, Status } from './game.types';

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private userService: UserService,
    private gameHistoryService: GameHistoryService,
  ) {}

  async findById(gameId: number) {
    return await this.gameRepository.findById(gameId);
  }

  async findByIdWithBoard(gameId: number) {
    return await this.gameRepository.findById(gameId, { includeBoard: true });
  }

  async findByIdWithBoardAndUser(gameId: number) {
    return await this.gameRepository.findById(gameId, {
      includeBoard: true,
      includeUser: true,
    });
  }

  async initGame(userId: number, board: Board) {
    const game = await this.gameRepository.initGame(
      (await this.userService.findById(userId))!,
      board,
    );

    return game;
  }

  async play(game: Game, cell: PlayDTO) {
    game.status = await this.checkGameStatus(game, cell);
    game.time = Math.round(
      (Date.now() - Number(new Date(game!.creationDate))) / 1000,
    );

    if (game.status !== Status.lost) game.score = this.computePoints(game);

    return await game.save();
  }

  async playBulk(game: Game, cells: PlayBulkCells) {
    game.status = await this.checkGameStatus(
      game,
      (cells.find((cell) => cell.bomb) || cells[cells.length - 1]) as PlayDTO,
    );

    return await game.save();
  }

  async findByStatusWithUserPaginated(
    status: Status,
    options: PaginationOptions,
  ) {
    return await this.gameRepository.findByStatusWithUserPaginated(
      status,
      options,
    );
  }

  private async checkGameStatus(game: Game, cell: PlayDTO) {
    if (
      !cell.bomb &&
      game.board.rows * game.board.cols - game.board.mines ===
        (await this.gameHistoryService.getHistory(game)).count
    )
      return Status.won;

    return cell.bomb ? Status.lost : Status.draft;
  }

  private computePoints(game: Game) {
    const { board } = game;
    let sum = POINTS_MULTIPLIERS[board.difficulty];

    if (board.difficulty === Difficulty.custom)
      sum += Math.round((board.rows + board.cols) * 0.2);

    return game.score + sum;
  }
}
