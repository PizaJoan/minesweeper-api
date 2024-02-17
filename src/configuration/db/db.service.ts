import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { join } from 'path';

@Injectable()
export class DBConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  private getEnvKEy(key: string) {
    return this.configService.get<string>(key);
  }

  createSequelizeOptions(): SequelizeModuleOptions {
    const config: SequelizeModuleOptions = {
      dialect: 'mysql',
      host: this.getEnvKEy('DB_HOST'),
      port: Number(this.getEnvKEy('DB_PORT')),
      username: this.getEnvKEy('DB_USER'),
      password: this.getEnvKEy('DB_PASSWORD'),
      database: this.getEnvKEy('DB_DATABASE'),
      autoLoadModels: true,
      synchronize: true,
    };

    if (this.getEnvKEy('ISPROD')) {
      config.dialectOptions = {
        ssl: {
          ca: fs.readFileSync(join(__dirname, 'cert.ca')).toString(),
        },
      };
    }

    return config;
  }
}
