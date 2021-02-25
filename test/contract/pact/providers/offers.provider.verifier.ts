/* eslint-disable jest/no-done-callback */
/* eslint-disable no-console */
/* eslint-disable jest/expect-expect */
import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import { Server } from 'http';
import { startMockProvider } from './mock_offers_provider';

// Verify that the provider meets all consumer expectations
describe('Offers Api Pact Verification', () => {
  let server: Server;
  beforeAll(() => {
    server = startMockProvider();
  });

  afterAll(() => {
    server.close();
  });

  it('validates the expectations of Offers Api', async (done) => {
    const opts: VerifierOptions = {
      provider: 'OffersApi',
      providerBaseUrl: 'http://localhost:3000/',

      // Fetch pacts from broker
      pactBrokerUrl: 'http://localhost:9292/',

      // Fetch from broker with given tags
      consumerVersionTags: ['dev'],

      // Tag provider with given tags
      providerVersionTags: ['dev'],

      // Enables "pending pacts" feature
      // enablePending: true,
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    };

    try {
      await new Verifier(opts).verifyProvider();
      done();
    } catch (error) {
      done.fail(`Error: ${error.message}`);
    }
  }, 10000);
});
