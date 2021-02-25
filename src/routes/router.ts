import Router from 'express-promise-router';
import { coreRoutes } from '../apps/core/controllers';
import { helloRoutes } from '../apps/helloWorld/controllers';

export const router = Router();

router.use('/', coreRoutes);
router.use('/', helloRoutes);
