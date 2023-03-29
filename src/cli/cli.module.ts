import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import * as Commands from 'src/cli/command';
import { FusionModule } from 'src/fusion/fusion.module';
import { OpenOceanModule } from 'src/open-ocean/open-ocean.module';

const commands = Object.values(Commands);

@Module({
  imports: [CommandModule, OpenOceanModule, FusionModule],
  providers: [...commands],
  exports: [...commands]
})
export class CliModule {}
