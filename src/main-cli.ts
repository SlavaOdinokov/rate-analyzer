import { Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';

import { CliModule } from 'src/cli/cli.module';
// import { inspectFmt } from "src/common";

async function bootstrap(): Promise<void> {
  const LOG_LEVEL = process.env.LOG_LEVEL || '';
  const logger: Logger = new Logger('Bootstrap', { timestamp: true });
  const app = await NestFactory.createApplicationContext(CliModule, {
    logger: LOG_LEVEL.split(',') as LogLevel[]
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (e) {
    logger.error(e);
    await app.close();
  } finally {
    process.exit(0);
  }
}

bootstrap();
