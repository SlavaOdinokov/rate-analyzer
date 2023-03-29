import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { LogLevel, Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const LOG_LEVEL = process.env.LOG_LEVEL || '';
  const logger: Logger = new Logger('Bootstrap', { timestamp: true });

  const app = await NestFactory.create(AppModule, {
    logger: LOG_LEVEL.split(',') as LogLevel[],
    cors: {
      origin: true
    }
  });

  const limit = '50mb';
  app.use(json({ limit }));
  app.use(urlencoded({ limit, extended: true }));

  await app.listen(PORT).then(async () => {
    logger.log(`Server running at: ${await app.getUrl()}`);
  });
}

bootstrap();
