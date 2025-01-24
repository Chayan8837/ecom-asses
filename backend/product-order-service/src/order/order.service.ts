import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const { products, ...orderDetails } = orderData;

    // Calculate order date and delivery date
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(orderDate.getDate() + 7); // Delivery in 7 days

    // Calculate total order price
    const totalOrderPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    // Create the order
    const order = this.orderRepository.create({
      ...orderDetails,
      orderDate,
      deliveryDate,
      totalOrderPrice,
    });

    // Assign products to the order
    if (products && products.length > 0) {
      order.products = products.map((product) =>
        this.productRepository.create(product),
      );
    }

    // Save the order with products
    return this.orderRepository.save(order);
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products'] });
  }

  async findOrderById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async cancelOrder(id: number): Promise<Order> {
    const order = await this.findOrderById(id);
    if (!order) throw new Error('Order not found');
    order.status = 'canceled';
    return this.orderRepository.save(order);
  }

  async markOrderAsDelivered(id: number): Promise<Order> {
    const order = await this.findOrderById(id);
    if (!order) throw new Error('Order not found');
    order.status = 'delivered';
    order.deliveryDate = new Date(); // Set delivery date to today
    return this.orderRepository.save(order);
  }
  async findOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['products'],
    });
  }
  
}
