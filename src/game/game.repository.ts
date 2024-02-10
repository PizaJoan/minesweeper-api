import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Board } from 'src/board/board.model';
import { User } from 'src/user/user.model';
import { Game } from './game.model';
import { Status } from './game.types';

@Injectable()
export class GameRepository {
  constructor(@InjectModel(Game) private gameModel: typeof Game) {}

  async initGame(user: User, board: Board) {
    const result = await this.gameModel.create({
      status: Status.created,
      board: board,
      userId: user.id,
      boardId: board.id,
    });

    return result;
  }

  async findById(
    gameId: number,
    options?: { includeBoard?: boolean; includeUser?: boolean },
  ) {
    const include = options
      ? {
          include: [
            { type: Board, include: options.includeBoard },
            { type: User, include: options.includeUser },
          ]
            .filter(({ include }) => include)
            .map(({ type }) => type),
        }
      : undefined;

    return await this.gameModel.findByPk(gameId, include);
  }
}
