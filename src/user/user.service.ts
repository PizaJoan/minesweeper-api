import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async initUser() {
    return await this.userRepository.createUser();
  }

  async findById(userId: number) {
    return await this.userRepository.findById(userId);
  }
}
