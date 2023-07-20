import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ReqCreateOrder } from './dto/create-order/req-create-order.dto';
import { CustomerGuard } from 'src/guard';

@Controller('orders')
export class OrdersController {
  constructor(private orderServices: OrdersService) {}

  @UseGuards(CustomerGuard)
  @Post('/createOrder')
  async createOrder(@Body() body: ReqCreateOrder) {
    return this.orderServices.createOrder(body);
  }
}
