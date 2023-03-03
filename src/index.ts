import process from 'process';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { MongoDBConnection } from './db';
import { setupRoutes } from './routes';

dotenv.config();
const app: Express = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);

const start = async () => {
  const port = process.env.PORT;

  try {
    await MongoDBConnection.connect();

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
