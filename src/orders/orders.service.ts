import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { OrderSchema } from './persistance/orders.entity';
import { DeleteResponse } from 'src/common/types';
import { CreateOrderDto } from './dto';
import { calcRate } from 'src/utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderSchema)
    private ordersRepository: Repository<OrderSchema>
  ) {}

  async getAll(): Promise<OrderSchema[]> {
    return this.ordersRepository.find();
  }

  async delete(id: number): Promise<DeleteResponse> {
    await this.ordersRepository.delete({ id });
    return { status: 200, message: `Order id ${id} has been deleted` };
  }

  async create(body: CreateOrderDto): Promise<OrderSchema> {
    const { makingAmount, takingAmount } = body;

    const order = {
      ...body,
      rate: calcRate(makingAmount, takingAmount)
    };

    return this.ordersRepository.save(order);
  }
}
