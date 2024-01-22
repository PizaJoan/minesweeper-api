import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtendedConfigModule } from './configuration/config/config.module';
import { DBConfigModule } from './configuration/db/db.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [ExtendedConfigModule, DBConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
