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
      const params: ProxyParams = { chainId: 1, limit: 100 };

      const ordersOpenOcean = await this.openoceanService.list({});
      const ordersFusion = await this.fusionService.list(params);

      // ordersOpenOcean.data.forEach((order: any) => {
      //   console.log(order);
      // });
      console.log(`Was found ${ordersFusion.items.length} orders on fusion SDK`);
      ordersFusion.items.forEach((order: any) => {
        const find = ordersOpenOcean.data.filter(
          (o: any) =>
            order.order.makerAsset === o.data.makerAsset &&
            order.order.takerAsset === o.data.takerAsset &&
            o.statuses === 1
        );
        console.log(`order fusion\n${order.order.makerAsset}\n${order.order.takerAsset}`);
        console.log(
          `makingAmount fusion - ${order.order.makingAmount}\ntakingAmount fusion - ${order.order.takingAmount}`
        );
        console.log(`Was found ${find.length} orders on OpenOcean\n`);
        if (find.length > 0) {
          find.forEach((f: any) => {
            console.log(`statuses - ${f.statuses}`);
            console.log(`makerAsset - ${f.data.makerAsset}`);
            console.log(`takerAsset - ${f.data.takerAsset}`);
            console.log(`makerAssetSymbol - ${f.data.makerAssetSymbol}`);
            console.log(`takerAssetSymbol - ${f.data.takerAssetSymbol}`);
            console.log(`makingAmount - ${f.data.makingAmount}`);
            console.log(`takingAmount - ${f.data.takingAmount}\n`);
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
