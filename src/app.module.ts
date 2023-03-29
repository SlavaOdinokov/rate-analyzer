import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ConfigModule } from './config/config.module';
import { OpenOceanModule } from './open-ocean/open-ocean.module';
import { FusionModule } from './fusion/fusion.module';
import { CliModule } from './cli';

// Services
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getTypeOrmConfig(),
      inject: [ConfigService]
    }),
    OpenOceanModule,
    FusionModule,
    CliModule
  ]
})
export class AppModule {}
