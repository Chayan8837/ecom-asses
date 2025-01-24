// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  // Add a product to the cart
  async addToCart(userId: number, productId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({ where: { userId } });

    if (cart) {
      // If cart exists, add the product to the products array
      const productExists = cart.products.some((product) => product.productId === productId);
      if (!productExists) {
        cart.products.push({ productId });
      }
      return this.cartRepository.save(cart); // Save updated cart
    } else {
      // If no cart exists, create a new cart with the userId and the product
      cart = this.cartRepository.create({
        userId,
        products: [{ productId }],
      });
      return this.cartRepository.save(cart);
    }
  }

  // Remove a product from cart
  async removeFromCart(userId: number, productId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { userId } });

    if (cart) {
      cart.products = cart.products.filter((product) => product.productId !== productId);
      return this.cartRepository.save(cart);
    }
    return null; // Return null if no cart is found
  }

  // Get the cart of a specific user
  async getCart(userId: number): Promise<Cart> {
    return this.cartRepository.findOne({ where: { userId } });
  }
}
