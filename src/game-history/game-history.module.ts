import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameHistory } from './game-history.model';
import { GameHistoryRepository } from './game-history.repository';

@Module({
  imports: [SequelizeModule.forFeature([GameHistory])],
  providers: [GameHistoryRepository],
})
export class GameHistoryModule {}
