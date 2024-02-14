import { Controller, Get, Query } from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/init')
  async initUser(
    @Query('userId') userId: number,
    @Query('token') token: string,
  ) {
    let user: User;
    // Oauth flow
    if (token) user = await this.userService.initUserWithToken(token, userId);
    // Bare user
    else if (!userId) user = await this.userService.initUser();
    // Fallback
    else user = (await this.userService.findById(userId))!;

    return { id: user.id, name: user.name };
  }
}
