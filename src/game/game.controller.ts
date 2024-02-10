import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BoardService } from 'src/board/board.service';
import { GameHistoryService } from 'src/game-history/game-history.service';

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
    @Res({ passthrough: true }) response: Response,
    @Body() initGameDto: InitGameDTO,
  ) {
    const board = await this.boardService.initBoard(initGameDto);
    const game = await this.gameService.initGame(initGameDto.userId, board);

    return { board, game };
  }

  @Post('/play')
  async play(@Body() cell: PlayDTO) {
    const game = await this.gameService.findByIdWithBoardAndUser(cell.gameId!);

    if (
      !game ||
      cell.userId !== game.user.id ||
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
