import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { COOKIE_KEY } from 'src/constants/cookie';
import { MinesweeperCookie } from 'src/cookies/types';
import { Cookies } from 'src/decorators/cookies.decorator';
import { createDate } from 'src/lib/date';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/init')
  async initUser(
    @Cookies(COOKIE_KEY) cookie: MinesweeperCookie,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!cookie) {
      const user = await this.userService.initUser();

      response.cookie(
        COOKIE_KEY,
        { userId: user.id },
        {
          expires: createDate(),
        },
      );
    }

    return cookie;
  }
}
