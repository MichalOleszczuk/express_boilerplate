import Router from 'express-promise-router';
import { HttpException } from '../../../modules/exceptions/HttpException';
import { UsersNotFoundException } from '../../../modules/exceptions/UsersNotFoundException';
import { helloWorldService } from '../helloWorld.service';

export const HelloWorldController = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns hello message
 *     responses:
 *       200:
 *         description: string
 */
HelloWorldController.get('/', (_req, res) => {
  res.send(helloWorldService.getHello());
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns list of users
 *     responses:
 *       200:
 *         description: UserEntity[]
 */
HelloWorldController.get('/users', async (_req, res) => {
  const usersList = await helloWorldService.getUsers();

  if (!usersList.length) throw UsersNotFoundException;

  res.json(usersList);
});

/**
 * @swagger
 * /error:
 *   get:
 *     description: Sample global error handling
 *     responses:
 *       500:
 *         description: Error
 */
HelloWorldController.get('/error', (_req, _res) => {
  throw HttpException(500);
});

/**
 * @swagger
 * /not-found:
 *   get:
 *     description: Sample global error handling
 *     responses:
 *       500:
 *         description: Error
 */
HelloWorldController.get('/not-found', (_req, _res) => {
  throw HttpException(404);
});

/**
 * @swagger
 * /random_offer:
 *   get:
 *     description: Returns sample contracted offer from provider
 *     responses:
 *       200:
 *         description: Offer
 */
HelloWorldController.get('/random_offer', async (_req, res) => {
  const randomOffer = await helloWorldService.getRandomOffer();

  res.send(randomOffer);
});
