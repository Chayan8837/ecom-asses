import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() orderData: {
      userId: number;
      name: string;
      phone: string;
      status: string;
      address: string;
      products: { productId: number; quantity: number; price: number }[];
    },
  ): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get()
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  @Patch('cancel/:id')
  async cancelOrder(@Param('id') id: number): Promise<Order> {
    return this.orderService.cancelOrder(id);
  }

  @Patch('deliver/:id')
  async markOrderAsDelivered(@Param('id') id: number): Promise<Order> {
    return this.orderService.markOrderAsDelivered(id);
  }
  @Get('user/:userId')
async findOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
  return this.orderService.findOrdersByUserId(userId);
}

}
