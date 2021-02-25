import Router from 'express-promise-router';
import { MetricsController } from './metrics.controller';

export const coreRoutes = Router();

coreRoutes.use(MetricsController);
