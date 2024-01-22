import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ExtendedConfigModule } from '../config/config.module';
import { DBConfigService } from './db.service';

@Module({
  imports: [
    ExtendedConfigModule,
    SequelizeModule.forRootAsync({
      useClass: DBConfigService,
      imports: [ExtendedConfigModule],
    }),
  ],
  providers: [DBConfigService],
  exports: [DBConfigService],
})
export class DBConfigModule {}
