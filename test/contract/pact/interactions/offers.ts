import {
  Interaction,
  InteractionObject,
  Matchers,
} from '@pact-foundation/pact';
import { eachLike } from '@pact-foundation/pact/src/dsl/matchers';

export const response: InteractionObject | Interaction = {
  state: 'Request offers from sample service',
  uponReceiving: 'a request for offers',
  withRequest: {
    path: '/offer',
    method: 'GET',
  },
  willRespondWith: {
    body: {
      offers: eachLike({
        name: Matchers.like('Offer 1'),
        netPrice: Matchers.like(12345),
      }),
    },
    status: 200,
  },
};
