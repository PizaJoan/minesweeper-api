import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async initUser() {
    const randomUser = await fetch('https://api.namefake.com/');
    const { name } = await randomUser.json();

    return await this.userRepository.createUser(name);
  }

  async findById(userId: number) {
    return await this.userRepository.findById(userId);
  }
}
