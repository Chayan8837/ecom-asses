// src/cart/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;  // Store the user ID

  @Column('json')
  products: {
    productId: number;
  }[];
}
