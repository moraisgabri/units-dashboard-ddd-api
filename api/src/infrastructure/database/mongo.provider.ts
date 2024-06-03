import { Db, MongoClient } from "mongodb";
import { appConfig } from "../../app-config.settings";

export class MongoProvider {
  private client: MongoClient;
  config = appConfig.db;
  db: Db = {} as Db;

  constructor() {
    this.client = new MongoClient(this.config.uri);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.config.name);
  }

  async close() {
    await this.client.close();
  }

  async getDb() {
    return this.db;
  }
}

export const database = new MongoProvider();
