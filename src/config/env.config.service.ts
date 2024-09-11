import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { readFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: process.env.NODE_ENV
    ? process.env.NODE_ENV.trim() !== 'DEV'
      ? '.env.prod'
      : '.env.dev'
    : '.env.dev',
});

class ConfigService {
  public typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
      return {
        type: 'postgres',
        host: this.getValue('DATABASE_HOST'),
        port: parseInt(this.getValue('DATABASE_PORT')),
        username: this.getValue('DATABASE_USER'),
        password: this.getValue('DATABASE_PASSWORD'),
        database: this.getValue('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        ssl:
          this.getValue('DATABASE_SSL') === 'true'
            ? {
                ca: readFileSync(
                  join(
                    __dirname,
                    '..',
                    '..',
                    'data',
                    'db',
                    'ca-certificate.crt',
                  ),
                ).toString(),
              }
            : false,
        synchronize: true,
        poolSize: 5,
      };
    },
  };
  public typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: this.getValue('DATABASE_HOST'),
    port: parseInt(this.getValue('DATABASE_PORT')),
    username: this.getValue('DATABASE_USER'),
    password: this.getValue('DATABASE_PASSWORD'),
    database: this.getValue('DATABASE_NAME'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    ssl:
      this.getValue('DATABASE_SSL') === 'true'
        ? {
            ca: readFileSync(
              join(__dirname, '..', '..', 'data', 'db', 'ca-certificate.crt'),
            ).toString(),
          }
        : false,
    synchronize: true,
    logging: true,
  };

  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing)
      throw new Error(`config error - missing env.${key}`);

    return value;
  }
  public OpenAiKey(): string {
    return this.getValue('OPENAI_API_KEY', true);
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);

export { configService };
