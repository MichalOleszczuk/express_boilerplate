import * as express from 'express';
import { router } from '../routes/router';
import { coreMiddlewares } from './core/middlewares';
import { exceptionsMiddleware } from './core/middlewares/exceptions';
import { helloMiddlewares } from './helloWorld/middlewares';

export const app = express();

// Apply middlewares
app.use([...coreMiddlewares, ...helloMiddlewares]);

// Adding URL's
app.use('/', router);

// Global exceptions handling
app.use(exceptionsMiddleware);
