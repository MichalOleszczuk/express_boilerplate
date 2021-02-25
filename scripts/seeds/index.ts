import { LoggerService } from '../../src/modules/logger';
import { getSeedsFiles, srcPath } from './seeds.utils';

async function seeds() {
  LoggerService.init();
  const foundSeeds = await getSeedsFiles(srcPath);
  LoggerService.logger.notice('Seeds found', foundSeeds);

  await Promise.all(
    foundSeeds.map(async (seedFile) => {
      const { seed } = (await import(seedFile)) as {
        seed: () => Promise<void>;
      };
      await seed();
    }),
  );

  LoggerService.logger.notice('Seeding done');
}

seeds();
