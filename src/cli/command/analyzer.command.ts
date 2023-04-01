import { Injectable, Logger } from '@nestjs/common';
import { Command, Option } from 'nestjs-command';

import { NetworkEnum } from '@1inch/fusion-sdk';

import { OpenOceanService } from 'src/open-ocean/open-ocean.service';
import { FusionService } from 'src/fusion/fusion.service';
import { OrdersService } from 'src/orders/orders.service';
import { OpenOceanDataResponse } from 'src/open-ocean/types';
import { calcRate, compareRates, minRate } from 'src/utils';

@Injectable()
export class AnalyzerCommand {
  private readonly logger = new Logger('Analyzer', { timestamp: true });
  public constructor(
    private readonly openoceanService: OpenOceanService,
    private readonly fusionService: FusionService,
    private readonly ordersService: OrdersService
  ) {}

  @Command({ command: 'analyzer', describe: 'rate analyzer' })
  public async rateAnalyzer(
    @Option({
      name: 'network',
      alias: 'n',
      describe: '1: ETHEREUM, 56: BINANCE, 137: POLYGON',
      type: 'number'
    })
    network: number
  ): Promise<void> {
    try {
      if (!network) {
        this.logger.error("Required parameter 'network'");
        process.exit(0);
      }
      if (!NetworkEnum[network]) {
        this.logger.error(`Network ${network} not supported`);
        process.exit(0);
      }

      const chainId = network;
      const ordersOpenOcean = await this.openoceanService.list({ chainId });
      const ordersFusion = await this.fusionService.list({ chainId });

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
          const ratesOpenocean: string[] = [];

          for (let j = 0; j < foundSame.length; j++) {
            const orderSame = foundSame[j];
            const rateO = calcRate(orderSame.data.makingAmount, orderSame.data.takingAmount);
            ratesOpenocean.push(rateO);

            console.log(`rate order openocean - ${rateO}`);
            console.log(`statuses - ${orderSame.statuses}`);
            console.log(`makerAsset - ${orderSame.data.makerAsset}`);
            console.log(`takerAsset - ${orderSame.data.takerAsset}`);
            console.log(`makerAssetSymbol - ${orderSame.data.makerAssetSymbol}`);
            console.log(`takerAssetSymbol - ${orderSame.data.takerAssetSymbol}`);
            console.log(`makingAmount - ${orderSame.data.makingAmount}`);
            console.log(`takingAmount - ${orderSame.data.takingAmount}\n`);
          }

          const index = minRate(ratesOpenocean);
          const orderO = foundSame[index];
          const rateO = calcRate(orderO.data.makingAmount, orderO.data.takingAmount);
          const compare = compareRates(rateF, rateO);

          const order = {
            network: chainId,
            statuses: 1,
            makerAsset: orderO.data.makerAsset,
            makerAssetSymbol: orderO.data.makerAssetSymbol,
            makerAssetDecimals: orderO.data.makerAssetDecimals,
            takerAsset: orderO.data.takerAsset,
            takerAssetSymbol: orderO.data.takerAssetSymbol,
            takerAssetDecimals: orderO.data.takerAssetDecimals
          };

          if (compare === -1 || compare === 0) {
            // save order fusion
            this.ordersService.create({
              ...order,
              salt: orderF.order.salt,
              makingAmount: orderF.order.makingAmount,
              takingAmount: orderF.order.takingAmount,
              maker: orderF.order.maker,
              source: 'fusion',
              rate: rateF
            });
          } else {
            // save order openocean
            this.ordersService.create({
              ...order,
              salt: orderO.data.salt,
              makingAmount: orderO.data.makingAmount,
              takingAmount: orderO.data.takingAmount,
              maker: orderO.data.maker,
              source: 'openocean',
              rate: rateO
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
