import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { ConfigModule } from './config/config.module';
import { OpenOceanModule } from './open-ocean/open-ocean.module';
import { FusionModule } from './fusion/fusion.module';
import { TasksModule } from './tasks/tasks.module';
import { OrdersModule } from './orders/orders.module';
import { CliModule } from './cli';

// Services
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    OpenOceanModule,
    FusionModule,
    TasksModule,
    OrdersModule,
    CliModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getTypeOrmConfig(),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
