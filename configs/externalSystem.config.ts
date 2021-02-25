import { ConfigService } from '../src/modules/config/config.service';

export const sampleExternalSystemConfiguration = ConfigService.registerAs(
  'sampleExternalSystem',
  () => {
    const externalSystemEntries = ConfigService.applicationYml.externalSystem;

    if (!externalSystemEntries) return;

    // eslint-disable-next-line consistent-return
    return {
      offer: {
        url: externalSystemEntries.offer.url as string,
      },
    };
  },
);
