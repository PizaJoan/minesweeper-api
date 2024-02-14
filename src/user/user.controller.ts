import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/init')
  async initUser(
    @Query('userId') userId: number,
    @Query('token') token: string,
  ) {
    // Oauth flow
    if (token) {
      const user = await this.userService.initUserWithToken(token, userId);
      return user.name;
    }

    // Bare user
    if (!userId) {
      const user = await this.userService.initUser();
      return user.id;
    }

    return userId;
  }
}
