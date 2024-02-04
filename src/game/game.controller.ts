import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BoardService } from 'src/board/board.service';
import { COOKIE_KEY } from 'src/constants/cookie';
import { MinesweeperCookie } from 'src/cookies/types';
import { Cookies } from 'src/decorators/cookies.decorator';
import { GameHistoryService } from 'src/game-history/game-history.service';

import { createDate } from 'src/lib/date';
import { GameService } from './game.service';
import { InitGameDTO, PlayDTO } from './game.types';

@Controller('/game')
export class GameController {
  constructor(
    private gameService: GameService,
    private boardService: BoardService,
    private gameHistoryService: GameHistoryService,
  ) {}

  @Post('/init')
  async init(
    @Cookies(COOKIE_KEY) cookie: MinesweeperCookie,
    @Res({ passthrough: true }) response: Response,
    @Body() initGameDto: InitGameDTO,
  ) {
    const board = await this.boardService.initBoard(initGameDto);
    const game = await this.gameService.initGame(cookie.userId, board);

    response.cookie(
      COOKIE_KEY,
      { ...cookie, gameId: game.id },
      {
        expires: createDate(),
      },
    );

    return board;
  }

  @Post('/play')
  async play(
    @Cookies(COOKIE_KEY) cookie: MinesweeperCookie,
    @Body() cell: PlayDTO,
  ) {
    const game = await this.gameService.findByIdWithBoard(cookie.gameId!);

    if (
      !game ||
      (await this.gameHistoryService.alreadyPlayedCell(game, cell))
    ) {
      return {
        status: 'Invalid selection',
      };
    }

    cell.bomb = this.boardService.checkBomb(game.board, cell);

    await this.gameHistoryService.addHistory(game, cell);

    return { status: (await this.gameService.play(game, cell)).status };
  }
}
