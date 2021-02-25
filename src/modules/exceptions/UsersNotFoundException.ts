import * as createError from 'http-errors';

export const UsersNotFoundException = createError(404, 'Users not found', {
  stack: undefined,
});
