import { Injectable } from '@nestjs/common';
import { FusionSDK } from '@1inch/fusion-sdk';
import { ActiveOrdersResponse } from '@1inch/fusion-sdk/api/orders';

import { ProxyParams } from 'src/common/types';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class FusionService {
  constructor(private configService: ConfigService) {}

  async list(params: ProxyParams): Promise<ActiveOrdersResponse> {
    const chainId = params.chainId || 1;

    try {
      const sdk = new FusionSDK({
        url: this.configService.fusionUrl,
        network: chainId
      });

      const orders = await sdk.getActiveOrders();
      return orders;
    } catch (err) {
      throw new Error(err);
    }
  }
}
