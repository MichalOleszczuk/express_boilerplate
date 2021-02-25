import * as promClient from 'prom-client';

export function getRuntimeMetrics() {
  const runtimeMetrics = promClient.register.getMetricsAsJSON();
  return runtimeMetrics;
}
