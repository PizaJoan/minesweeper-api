import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';

import { BoardService } from 'src/board/board.service';
import { StringToInteger } from 'src/decorators/pipes/stringToInteger';
import { GameHistoryService } from 'src/game-history/game-history.service';

import { Order } from 'src/types/pagination';
import { GameService } from './game.service';
import { InitGameDTO, PlayBulkDTO, PlayDTO, Status } from './game.types';

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

  @Post('/play/bulk')
  @UsePipes(new StringToInteger())
  async playBulk(@Body() { cells, gameId, userId }: PlayBulkDTO) {
    const game = await this.gameService.findByIdWithBoardAndUser(gameId!);

    if (
      !game ||
      userId !== game.user.id ||
      (await this.gameHistoryService.alreadyPlayedCells(game!, cells))
    ) {
      return {
        status: 'Invalid selection',
      };
    }

    cells = cells.map((cell) => ({
      ...cell,
      bomb: this.boardService.checkBomb(game.board, cell as PlayDTO),
    }));

    await this.gameHistoryService.addHistoryBulk(game, cells);

    return { status: (await this.gameService.playBulk(game, cells)).status };
  }

  @Post('/play')
  @UsePipes(new StringToInteger())
  async play(@Body() cell: PlayDTO) {
    const game = await this.gameService.findByIdWithBoardAndUser(cell.gameId!);

    if (
      !game ||
      cell.userId !== game.user.id ||
      (await this.gameHistoryService.alreadyPlayedCell(game!, cell))
    ) {
      return {
        status: 'Invalid selection',
      };
    }

    cell.bomb = this.boardService.checkBomb(game.board, cell);

    await this.gameHistoryService.addHistory(game, cell);

    return { status: (await this.gameService.play(game, cell)).status };
  }

  @Get('/leaderboard')
  async leaderBoard(
    @Query('status') status: Status = Status.won,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('order') order: Order = Order.desc,
  ) {
    const games = await this.gameService.findByStatusWithUserPaginated(status, {
      page,
      limit: 8,
      orderBy: 'score',
      order,
    });

    return games;
  }
}
