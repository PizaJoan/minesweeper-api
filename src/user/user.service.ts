import { Injectable } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async initUser() {
    return await this.userRepository.createUser(await this.getRandomName());
  }

  async initUserWithToken(token: string, userId?: number) {
    // decode JWT Token
    const { name, email } = jwtDecode<{ name: string; email: string }>(token);

    const foundUser = await this.userRepository.findByEmailOrId(
      email,
      userId ?? 0,
    );

    if (foundUser) {
      if (userId && userId !== foundUser.id) {
        await this.userRepository.removeUser(userId);
      }

      if (foundUser.name !== name) {
        foundUser.name = name;
        await foundUser.save();
      }

      if (!foundUser.email || foundUser.email !== email) {
        foundUser.email = email;
        await foundUser.save();
      }

      return foundUser;
    }

    return await this.userRepository.createUserWithEmail(name, email);
  }

  async findById(userId: number) {
    return await this.userRepository.findById(userId);
  }

  private async getRandomName() {
    const randomUser = await fetch('https://api.namefake.com/');
    const { name } = await randomUser.json();

    return name;
  }
}
