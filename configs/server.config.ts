import { ConfigService } from '../src/modules/config/config.service';

export const serverConfiguration = ConfigService.registerAs(
  'serverConfiguration',
  () => {
    const serverEntries = ConfigService.applicationYml.server;

    if (!serverEntries) return;

    // eslint-disable-next-line consistent-return
    return {
      port: parseInt(serverEntries.PORT, 10) || 4000,
    };
  },
);
