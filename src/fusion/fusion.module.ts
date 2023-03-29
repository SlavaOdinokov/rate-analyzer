import { Global, Module } from '@nestjs/common';

import { FusionService } from './fusion.service';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [FusionService],
  exports: [FusionService]
})
export class FusionModule {}
