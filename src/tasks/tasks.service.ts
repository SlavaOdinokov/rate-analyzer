import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name, { timestamp: true });

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handle() {
    this.logger.debug('Called every 10 seconds');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async analyzer() {
    this.logger.debug('Called every 1 minute');
  }
}
