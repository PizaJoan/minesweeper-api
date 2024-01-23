import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private gameRepository: GameRepository) {}

  async getHello() {
    const result = await this.gameRepository.getHello();

    console.log(result);

    return result;
  }
}
