import * as promClient from 'prom-client';
import { getConnection } from 'typeorm';

const dbPoolSize = new promClient.Summary({
  name: 'db_pool_size',
  help: 'Current DB pool size',
  labelNames: ['poolSize'],
  aggregator: 'average',
});

export function gatherPoolSize() {
  const poolSize = (getConnection('default').driver as any).postgres.Pool
    .length as number;
  dbPoolSize.labels(poolSize.toString()).observe(poolSize);
  return poolSize;
}
