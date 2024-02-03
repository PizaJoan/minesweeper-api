import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BoardService } from 'src/board/board.service';
import { USER_KEY } from 'src/constants/cookie';
import { Cookies } from 'src/decorators/cookies.decorator';
import { createDate } from 'src/lib/date';
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
    @Res({ passthrough: true }) response: Response,
    @Body() initGameDto: InitGameDTO,
  ) {
    const board = await this.boardService.initBoard(initGameDto);
    const game = await this.gameService.initGame(user, board);

    response.cookie(
      USER_KEY,
      { ...user, game: game.id },
      {
        expires: createDate(),
      },
    );

    return board;
  }
}
