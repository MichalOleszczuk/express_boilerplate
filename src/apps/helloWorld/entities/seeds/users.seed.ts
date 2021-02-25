import * as faker from 'faker';
import { connectToDatabaseSeeds } from '../../../../../scripts/seeds/seeds.utils';
import { LoggerService } from '../../../../modules/logger';
import { UserEntity } from '../User.entity';

const usersCount = 98;

export const seed = async () => {
  try {
    LoggerService.logger.notice('User seed running');

    const db = await connectToDatabaseSeeds();
    const userRepository = db.getRepository(UserEntity);
    await userRepository.clear();

    for (let i = 1; i <= usersCount; i += 1) {
      const UserSeed = userRepository.create({
        id: i,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });

      // eslint-disable-next-line no-await-in-loop
      await UserSeed.save();
    }

    // Special guest for filtering. Case sensitive.
    const JasonBourne = userRepository.create({
      id: 99,
      name: 'Peter',
      lastName: 'Lastname',
    });

    await JasonBourne.save();

    const JasonWhatever = userRepository.create({
      id: 100,
      name: 'Peter',
      lastName: 'Whatever',
    });

    await JasonWhatever.save();

    LoggerService.logger.notice('User seed done');
  } catch (error) {
    throw new Error(`failed to seed database ${error.message}`);
  }
};
