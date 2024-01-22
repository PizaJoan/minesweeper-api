import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getHello() {
    const result = await this.userRepository.getHello();

    console.log(result);

    return result;
  }
}
