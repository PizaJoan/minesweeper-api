import { Controller, Get, Query } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/init')
  async initUser(@Query('userId') userId: number) {
    if (!userId) {
      const user = await this.userService.initUser();
      return user.id;
    }

    return userId;
  }
}
