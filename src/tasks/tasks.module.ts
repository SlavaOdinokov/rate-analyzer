import { Global, Module } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
