import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { Cookies } from 'src/decorators/cookies.decorator';
import { YEAR } from 'src/constants/miliseconds';
import { User } from './user.model';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/init')
  async initUser(
    @Cookies('user') user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!user) {
      user = await this.userService.initUser();
      response.cookie('user', user.toJSON(), {
        expires: new Date(Date.now() + YEAR),
      });
    }

    return user;
  }
}
