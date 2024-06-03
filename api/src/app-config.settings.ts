export class AppConfig {
  db: {
    uri: string;
    name: string;
  };
  api: {
    port: number;
  };

  constructor() {
    const DATABASE_USER = process.env.DATABASE_USER || "root";
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "root";
    const DATABASE_HOST = process.env.DATABASE_HOST;
    const DATABASE_PORT = process.env.DATABASE_PORT;
    const DATABASE_DB = process.env.MONGO_INITDB_DATABASE;

    const MONGO_URI = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;
    this.db = {
      uri: MONGO_URI,
      name: DATABASE_DB as string,
    };

    this.api = {
      port: Number(process.env.PORT) || 8001,
    };

    return this;
  }
}

export const appConfig = new AppConfig();
