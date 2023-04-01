import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderParams } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getAll() {
    return this.ordersService.getAll();
  }

  @Post()
  async create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @Delete('/:id')
  async deleteUser(@Param() params: OrderParams) {
    return this.ordersService.delete(+params.id);
  }
}
