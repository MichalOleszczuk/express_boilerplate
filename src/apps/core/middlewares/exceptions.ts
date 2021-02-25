import { ErrorRequestHandler, Response } from 'express';
import { HttpException } from '../../../modules/exceptions/HttpException';

const handleError = (
  error: ReturnType<typeof HttpException>,
  response: Response,
) => {
  // Sets HTTP status code
  response.status(error.status || 500);

  // Sends response
  response.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

export const exceptionsMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  handleError(error, res);
};
