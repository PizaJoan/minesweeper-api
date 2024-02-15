import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Op } from 'sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  // CREATES
  async createUser(name: string) {
    const result = await this.userModel.create({ name });

    return result;
  }

  async createUserWithEmail(name: string, email: string) {
    const result = await this.userModel.create({ name, email });

    return result;
  }

  // READS
  async findById(userId: number) {
    return await this.userModel.findByPk(userId);
  }

  async findByEmailOrId(email: string, userId: number) {
    return await this.userModel.findOne({
      where: { [Op.or]: { email: email, id: userId } },
    });
  }

  // DELETES
  async removeUser(userId: number) {
    return await this.userModel.destroy({ where: { id: userId }, force: true });
  }
}
