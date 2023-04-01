import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { OrderSchema } from 'src/orders/persistance/orders.entity';

dotenv.config();

const requiredParam = Symbol();
const getFromEnv = (key: string, fallback: any = requiredParam) => {
  const value = process.env[key];
  if (value === undefined) {
    if (fallback !== requiredParam) {
      return fallback;
    }
    throw new Error(`Required ENV variable missing: ${key}`);
  }
  return value.trim();
};

@Injectable()
export class ConfigService {
  public readonly dbClient = getFromEnv('DATABASE_CLIENT');
  public readonly dbHost = getFromEnv('DATABASE_HOST');
  public readonly dbPort = getFromEnv('DATABASE_PORT');
  public readonly dbName = getFromEnv('DATABASE_NAME');
  public readonly dbUser = getFromEnv('DATABASE_USERNAME');
  public readonly dbPassword = getFromEnv('DATABASE_PASSWORD');
  public readonly openoceanUrl = getFromEnv('OPEN_OCEAN_URL');
  public readonly fusionUrl = getFromEnv('FUSION_URL');

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.dbClient,
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUser,
      password: this.dbPassword,
      database: this.dbName,
      synchronize: true,
      entities: [OrderSchema]
    };
  }
}

