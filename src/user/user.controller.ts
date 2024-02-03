import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { USER_KEY } from 'src/constants/cookie';
import { Cookies } from 'src/decorators/cookies.decorator';
import { createDate } from 'src/lib/date';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/init')
  async initUser(
    @Cookies('user') user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!user) {
      user = await this.userService.initUser();
      response.cookie(USER_KEY, user.toJSON(), {
        expires: createDate(),
      });
    }

    return user;
  }
}
