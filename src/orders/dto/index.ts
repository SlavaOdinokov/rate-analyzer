import { Order } from '../persistance/orders.entity';

export interface OrderParams {
  id: string;
}

export interface CreateOrderDto extends Order {}
