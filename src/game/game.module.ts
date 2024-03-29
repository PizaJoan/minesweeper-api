import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BoardModule } from 'src/board/board.module';
import { GameHistoryModule } from 'src/game-history/game-history.module';
import { UsersModule } from 'src/user/user.module';
import { GameController } from './game.controller';
import { Game } from './game.model';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Game]),
    BoardModule,
    UsersModule,
    GameHistoryModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository],
  exports: [GameService],
})
export class GameModule {}
