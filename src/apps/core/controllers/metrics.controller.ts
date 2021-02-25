import Router from 'express-promise-router';
import { MetricsService } from '../../../modules/metrics/metrics.service';

export const MetricsController = Router();

MetricsController.use(MetricsService.getResponseCountersMiddleware());

/**
 * @swagger
 * /metrics:
 *   get:
 *     description: Returns metrics
 *     responses:
 *       200:
 *         description: Prometheus format string
 */
MetricsController.get('/metrics', async (_req, res, _next) => {
  res.set({
    'Content-Type': 'text/plain',
  });
  res.end(await MetricsService.getMetricsAsString());
});
