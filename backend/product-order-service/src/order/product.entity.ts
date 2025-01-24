import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number; // Unique ID for the product (from catalog)

  @Column()
  quantity: number; // Quantity of the product in the order

  @Column()
  price: number; // Price of the product

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}
