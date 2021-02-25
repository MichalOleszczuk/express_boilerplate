import { Server } from 'http';
import * as request from 'supertest';
import * as offerPact from '../../../../test/contract/pact/interactions/offers';
import { setupPactProvider } from '../../../../test/contract/pact/providers/offer.provider.pact';
import { main } from '../../../main';

const provider = setupPactProvider();

describe('HelloWorldController (e2e)', () => {
  let server: Server;
  beforeAll(async () => {
    server = await main();
    await provider.setup();

    await provider.addInteraction(offerPact.response);
  });

  afterAll(async () => {
    server.close();
    await provider.finalize();
  });

  it('/ (GET)', async () => {
    const res = await request(server).get('/');

    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Hello App!');
  }, 10000);

  it('/users (GET)', async () => {
    const res = await request(server).get('/users');

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({
      status: 404,
      message: 'Users not found',
    });
  }, 10000);

  it('/error (GET)', async () => {
    const res = await request(server).get('/error');

    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty('status', 500);
    expect(res.body).toHaveProperty('message', 'Internal Server Error');
    expect(res.body).toHaveProperty('stack');
  }, 10000);

  it('/not-found (GET)', async () => {
    const res = await request(server).get('/not-found');

    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('status', 404);
    expect(res.body).toHaveProperty('message', 'Not Found');
    expect(res.body).toHaveProperty('stack');
  }, 10000);

  it('/random_offer', async () => {
    const res = await request(server).get('/random_offer');

    expect(res.status).toEqual(200);

    expect(typeof res.body.name === 'string').toBe(true);
    expect(typeof res.body.netPrice === 'number').toBe(true);

    await provider.verify();
  }, 10000);
});
