import { Injectable } from '@nestjs/common';
import { FusionSDK, NetworkEnum } from '@1inch/fusion-sdk';

import { ProxyResponse, ProxyParams } from 'src/common/types';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class FusionService {
  constructor(private configService: ConfigService) {}

  async list(params: ProxyParams): Promise<ProxyResponse<any>> {
    const chainId = params.chainId || 1;
    const page = params.page || 1;
    const limit = params.limit || 10;

    try {
      const sdk = new FusionSDK({
        url: this.configService.fusionUrl,
        // network: NetworkEnum.ETHEREUM
        network: chainId
      });

      const orders = await sdk.getActiveOrders({ page, limit });
      return orders;
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        error: 'Internal server error'
      };
    }
  }
}

