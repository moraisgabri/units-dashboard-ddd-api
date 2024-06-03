import express from "express";
import { config } from "dotenv";
import { database } from "./infrastructure/database/mongo.provider";
import router from "./application/router/index.router";
import { appConfig } from "./app-config.settings";

async function runApp() {
  try {
    config();
    const app = express();
    await database.connect();
    app.use(express.json());
    app.use(router);
    app.listen(appConfig.api.port, () => {
      console.log(`Server listening on port ${appConfig.api.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

runApp();

export { runApp };
