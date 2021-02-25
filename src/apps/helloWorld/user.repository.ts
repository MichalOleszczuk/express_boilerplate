import { getConnection, Repository } from 'typeorm';
import { DbConfigSqlite } from '../../../configs/sqlite.config';
import { ConfigService } from '../../modules/config';
import { UserEntity } from './entities/User.entity';

const sqliteConfig = ConfigService.get<DbConfigSqlite>('sqliteConfig');

// eslint-disable-next-line import/no-mutable-exports
export let userRepository: Repository<UserEntity> | undefined;

if (sqliteConfig) {
  const connection = getConnection('sqlite');
  userRepository = connection.getRepository(UserEntity);
}
