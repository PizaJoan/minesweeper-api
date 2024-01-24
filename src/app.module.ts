import { Module } from '@nestjs/common';

import { BoardModule } from './board/board.module';
import { ExtendedConfigModule } from './configuration/config/config.module';
import { DBConfigModule } from './configuration/db/db.module';
import { GameHistoryModule } from './game-history/game-history.module';
import { GameModule } from './game/game.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ExtendedConfigModule,
    DBConfigModule,
    UsersModule,
    BoardModule,
    GameModule,
    GameHistoryModule,
  ],
})
export class AppModule {}
