import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './board.model';
import { BoardRepository } from './board.repository';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  providers: [BoardRepository],
})
export class BoardModule {}
