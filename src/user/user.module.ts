import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.respository';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), GameModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UsersModule {}
