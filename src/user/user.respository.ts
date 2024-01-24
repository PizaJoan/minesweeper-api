import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser() {
    const result = await this.userModel.create();

    console.log(result);

    return result;
  }
}
