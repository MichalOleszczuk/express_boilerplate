import Router from 'express-promise-router';
import { HelloWorldController } from './helloWorld.controller';

export const helloRoutes = Router();

helloRoutes.use(HelloWorldController);
