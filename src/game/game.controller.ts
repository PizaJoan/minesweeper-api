import { Body, Controller, Post } from '@nestjs/common';

import { GameService } from './game.service';
import { InitGameDTO } from './game.types';

import { BoardService } from 'src/board/board.service';

import { User } from 'src/user/user.model';

import { Cookies } from 'src/decorators/cookies.decorator';

@Controller('/game')
export class GameController {
  constructor(
    private gameService: GameService,
    private boardService: BoardService,
  ) {}

  @Post('/init')
  async initUser(
    @Cookies('user') user: User,
    @Body() initGameDto: InitGameDTO,
  ) {
    const board = await this.boardService.initBoard(initGameDto);

    return board;
  }
}
