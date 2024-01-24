import { Injectable } from '@nestjs/common';

import { Board } from 'src/board/board.model';
import { User } from 'src/user/user.model';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private gameRepository: GameRepository) {}

  async initGame(user: User, board: Board) {
    return null;
  }
}
