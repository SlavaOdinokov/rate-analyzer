import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { ProxyRequest, ProxyResponse, ProxyParams } from 'src/common/types';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class OpenOceanService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async list(params: ProxyParams): Promise<ProxyResponse<any>> {
    const chainId = params.chainId || 1;
    const page = params.page || 1;
    const limit = params.limit || 10;
    const statuses = params.statuses || [1];

    try {
      const req: ProxyRequest = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
        url:
          this.configService.openoceanUrl +
          `/${chainId}/limit-order/all?statuses=${statuses}&page=${page}&limit=${limit}`
      };

      const res = await lastValueFrom(this.httpService.request(req));
      return res.data;
    } catch (err) {
      if (err?.response) {
        // Axios error
        return {
          status: err.response.status,
          error: err.response.data
        };
      }
      console.error(err);
      return {
        status: 500,
        error: 'Internal server error'
      };
    }
  }
}
