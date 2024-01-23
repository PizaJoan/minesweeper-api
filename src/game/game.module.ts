import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './game.model';
import { GameRepository } from './game.repository';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  providers: [GameRepository],
})
export class GameModule {}
