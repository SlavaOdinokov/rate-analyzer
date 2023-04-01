import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

import { OpenOceanService } from 'src/open-ocean/open-ocean.service';
import { FusionService } from 'src/fusion/fusion.service';
import { OpenOceanDataResponse } from 'src/open-ocean/types';
import { calcRate, compareRates } from 'src/utils';

@Injectable()
export class AnalyzerCommand {
  public constructor(
    private readonly openoceanService: OpenOceanService,
    private readonly fusionService: FusionService
  ) {}

  @Command({ command: 'analyzer', describe: 'rate analyzer' })
  public async rateAnalyzer(): Promise<void> {
    try {
      const ordersOpenOcean = await this.openoceanService.list({});
      const ordersFusion = await this.fusionService.list({});

      console.log(`Was found ${ordersFusion.items.length} orders on fusion SDK`);

      for (let i = 0; i < ordersFusion.items.length; i++) {
        const orderF = ordersFusion.items[i];
        const rateF = calcRate(orderF.order.makingAmount, orderF.order.takingAmount);

        const foundSame = ordersOpenOcean.data.filter(
          (orderO: OpenOceanDataResponse) =>
            orderF.order.makerAsset === orderO.data.makerAsset &&
            orderF.order.takerAsset === orderO.data.takerAsset &&
            orderO.statuses === 1
        );

        console.log(`order fusion\n${orderF.order.makerAsset}\n${orderF.order.takerAsset}`);
        console.log(
          `makingAmount fusion - ${orderF.order.makingAmount}\ntakingAmount fusion - ${orderF.order.takingAmount}`
        );
        console.log(`Rate order fusion ${rateF}`);
        console.log(`Was found ${foundSame.length} orders on OpenOcean\n`);

        if (foundSame.length > 0) {
          for (let j = 0; j < foundSame.length; j++) {
            const orderSame = foundSame[j];
            const rateO = calcRate(orderSame.data.makingAmount, orderSame.data.takingAmount);
            const compare = compareRates(rateF, rateO);

            console.log(`rate order openocean - ${rateO}`);
            console.log(`compareRates - ${compare}`);
            console.log(`statuses - ${orderSame.statuses}`);
            console.log(`makerAsset - ${orderSame.data.makerAsset}`);
            console.log(`takerAsset - ${orderSame.data.takerAsset}`);
            console.log(`makerAssetSymbol - ${orderSame.data.makerAssetSymbol}`);
            console.log(`takerAssetSymbol - ${orderSame.data.takerAssetSymbol}`);
            console.log(`makingAmount - ${orderSame.data.makingAmount}`);
            console.log(`takingAmount - ${orderSame.data.takingAmount}\n`);

            if (compare === -1 || compare === 0) {
              // save order fusion
            } else {
              // save order openocean
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
