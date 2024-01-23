import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './game.model';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  providers: [GameService, GameRepository],
  exports: [GameService],
})
export class GameModule {}
