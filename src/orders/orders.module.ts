import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderSchema } from './persistance/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Global()
@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrderSchema])],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
