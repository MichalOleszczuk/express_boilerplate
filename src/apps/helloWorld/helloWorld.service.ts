import { Repository } from 'typeorm';
import { sampleExternalSystemConfiguration } from '../../../configs/externalSystem.config';
import { ConfigService } from '../../modules/config';
import HttpService from '../../modules/http/http.service';
import { UserEntity } from './entities/User.entity';
import { IOffersResponse } from './interfaces/IOffers';
import { userRepository } from './user.repository';

export class HelloWorldService {
  private userRepo?: Repository<UserEntity>;

  constructor(userRepositoryInstance?: Repository<UserEntity>) {
    if (userRepositoryInstance) {
      this.userRepo = userRepositoryInstance;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public getHello() {
    return 'Hello App!';
  }

  public async getUsers() {
    let usersList: UserEntity[] = [];

    if (this.userRepo) {
      usersList = await this.userRepo.find();
    }

    return usersList;
  }

  public async getRandomOffer() {
    const { offer } = ConfigService.get<
      typeof sampleExternalSystemConfiguration
    >('sampleExternalSystem');

    const { data } = await HttpService.get<IOffersResponse>(offer.url);

    const randomOffer =
      data.offers[Math.floor(Math.random() * data.offers.length)];

    return randomOffer;
  }
}

export const helloWorldService = new HelloWorldService(userRepository);
