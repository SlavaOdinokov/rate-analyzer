import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { ProxyRequest, ProxyParams } from 'src/common/types';
import { ConfigService } from 'src/config/config.service';
import { OpenOceanResponse } from './types';

@Injectable()
export class OpenOceanService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async list(params: ProxyParams): Promise<OpenOceanResponse> {
    const chainId = params.chainId || 1;
    const statuses = params.statuses || [1];

    try {
      const req: ProxyRequest = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url: this.configService.openoceanUrl + `/${chainId}/limit-order/all?statuses=${statuses}`
      };

      const res = await lastValueFrom(this.httpService.request(req));
      return res.data;
    } catch (err) {
      if (err?.response) {
        // Axios error
        throw new Error(err.response.data);
      }
      throw new Error(err);
    }
  }
}
