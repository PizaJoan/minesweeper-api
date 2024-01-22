import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class DBConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  private getEnvKEy(key: string) {
    return this.configService.get<string>(key);
  }

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.getEnvKEy('DB_HOST'),
      port: Number(this.getEnvKEy('DB_PORT')),
      username: this.getEnvKEy('DB_USER'),
      password: this.getEnvKEy('DB_PASSWORD'),
      database: this.getEnvKEy('DB_DATABASE'),
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
