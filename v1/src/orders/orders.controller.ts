import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { OrdersService } from './orders.service';
import { CustomerGuard } from '../auth/guard';
import { ApiKeyV1 } from 'src/guards/checkApiKey';
@UseGuards(ApiKeyV1)
@Controller('/apiV1/orders')
export class OrdersController {
  constructor(private orderServices: OrdersService) {}

  @UseGuards(CustomerGuard)
  @Post('/createOrder')
  async createOrder(@Body() body: ReqCreateOrder) {
    return this.orderServices.createOrder(body);
  }
}
