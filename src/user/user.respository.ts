import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser() {
    const result = await this.userModel.create();

    return result;
  }

  async findById(userId: number) {
    return await this.userModel.findByPk(userId);
  }
}
