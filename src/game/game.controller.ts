import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BoardService } from 'src/board/board.service';
import { COOKIE_KEY } from 'src/constants/cookie';
import { MinesweeperCookie } from 'src/cookies/types';
import { Cookies } from 'src/decorators/cookies.decorator';
import { createDate } from 'src/lib/date';
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
    @Cookies(COOKIE_KEY) cookie: MinesweeperCookie,
    @Res({ passthrough: true }) response: Response,
    @Body() initGameDto: InitGameDTO,
  ) {
    const board = await this.boardService.initBoard(initGameDto);
    const game = await this.gameService.initGame(cookie.userId, board);

    response.cookie(
      COOKIE_KEY,
      { ...cookie, game: game.id },
      {
        expires: createDate(),
      },
    );

    return board;
  }
}
