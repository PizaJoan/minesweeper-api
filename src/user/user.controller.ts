import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { GameService } from 'src/game/game.service';
import { Cookies } from 'src/decorators/cookies.decorator';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly gameService: GameService,
  ) {}

  @Get()
  getHello(): any {
    return this.userService.getHello();
  }

  @Get('/init')
  initUser(
    @Cookies('user') user: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(this.userService, this.gameService, user);

    response.cookie('user', 'true', {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    return user;
  }
}
