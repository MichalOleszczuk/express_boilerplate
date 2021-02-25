import { serverConfiguration } from '../configs/server.config';
import { init } from './init';
import { ConfigService } from './modules/config';
import { LoggerService } from './modules/logger';

export async function main() {
  await init();
  const { port } = ConfigService.get<typeof serverConfiguration>(
    'serverConfiguration',
  );
  const { app } = await import('./apps/app');

  const server = app.listen(port);
  LoggerService.logger.notice(`Server has started on port: ${port}`);
  return server;
}
