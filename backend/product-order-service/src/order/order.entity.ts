import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string; // Customer's name

  @Column()
  phone: string; // Customer's phone number

  @Column()
  status: string; // e.g., 'pending', 'completed', 'canceled'

  @Column()
  address: string; // Address for delivery

  @Column()
  totalOrderPrice: number; // Total price of the order

  @Column()
  orderDate: Date; // Date when the order was placed

  @Column()
  deliveryDate: Date; // Delivery date (7 days from orderDate)

  @OneToMany(() => Product, (product) => product.order, { cascade: true })
  products: { productId: number; quantity: number; price: number; }[]; // Products in the order
}