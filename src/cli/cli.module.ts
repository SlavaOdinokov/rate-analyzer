import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

import * as Commands from 'src/cli/command';
import { ConfigModule } from 'src/config/config.module';
import { FusionModule } from 'src/fusion/fusion.module';
import { OpenOceanModule } from 'src/open-ocean/open-ocean.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ConfigService } from 'src/config/config.service';

const commands = Object.values(Commands);

@Module({
  imports: [
    CommandModule,
    OpenOceanModule,
    FusionModule,
    OrdersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getTypeOrmConfig(),
      inject: [ConfigService]
    })
  ],
  providers: [...commands],
  exports: [...commands]
})
export class CliModule {}
