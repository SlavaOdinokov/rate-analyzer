import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

import { OpenOceanService } from 'src/open-ocean/open-ocean.service';
import { FusionService } from 'src/fusion/fusion.service';
import { ProxyParams } from 'src/common/types';

@Injectable()
export class AnalyzerCommand {
  public constructor(
    private readonly openoceanService: OpenOceanService,
    private readonly fusionService: FusionService
  ) {}

  @Command({ command: 'analyzer', describe: 'rate analyzer' })
  public async rateAnalyzer(): Promise<void> {
    try {
      const params: ProxyParams = { chainId: 1, limit: 10 };

      const ordersOpenOcean = await this.openoceanService.list(params);
      const ordersFusion = await this.fusionService.list(params);

      // console.log('orders OpenOcean', ordersOpenOcean);
      ordersFusion.items.forEach((order: any) => {
        console.log(order);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
