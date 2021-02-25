import * as promClient from 'prom-client';
import * as ResponseTime from 'response-time';

const responses = new promClient.Summary({
  name: 'response_times',
  help: 'Response time in millis',
  labelNames: ['method', 'path', 'status'],
  aggregator: 'average',
});

export const responseCounters = ResponseTime((req, res, time) => {
  if (req.url !== '/metrics') {
    responses
      .labels(req.method, req.url, res.statusCode.toString())
      .observe(time);
  }
});
