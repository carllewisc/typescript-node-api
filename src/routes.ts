import { Express } from 'express';

import auth from './modules/auth/routes';
import users from './modules/users/routes';

export const setupRoutes = (app: Express) => {
  const prefix = '/api';
  app.use(`${prefix}/users`, users);
  app.use(`${prefix}/auth`, auth);
};
