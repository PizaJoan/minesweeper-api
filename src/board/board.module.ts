import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Board } from './board.model';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [SequelizeModule.forFeature([Board])],
  providers: [BoardService, BoardRepository],
  exports: [BoardService],
})
export class BoardModule {}
