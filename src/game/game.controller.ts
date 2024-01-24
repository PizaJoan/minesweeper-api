import { Body, Controller, Post } from '@nestjs/common';

import { BoardService } from 'src/board/board.service';
import { Cookies } from 'src/decorators/cookies.decorator';
import { User } from 'src/user/user.model';
import { GameService } from './game.service';
import { InitGameDTO } from './game.types';

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
