import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { OpenOceanService } from './open-ocean.service';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
  imports: [ConfigModule, HttpModule.register({})],
  providers: [OpenOceanService],
  exports: [OpenOceanService]
})
export class OpenOceanModule {}
