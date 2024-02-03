import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GameHistory } from './game-history.model';
import { GameHistoryRepository } from './game-history.repository';
import { GameHistoryService } from './game-history.service';

@Module({
  imports: [SequelizeModule.forFeature([GameHistory])],
  providers: [GameHistoryService, GameHistoryRepository],
  exports: [GameHistoryService],
})
export class GameHistoryModule {}
