// src/cart/cart.controller.ts
import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add product to the cart
  @Post('add')
  async addToCart(@Body() body: { userId: number; productId: number }) {
    const { userId, productId } = body;
    const cart = await this.cartService.addToCart(userId, productId);
    return cart;
  }

  // Remove product from cart
  @Post('remove')
  async removeFromCart(@Body() body: { userId: number; productId: number }) {
    const { userId, productId } = body;
    const cart = await this.cartService.removeFromCart(userId, productId);
    return cart;
  }

  // Get the cart of a specific user
  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    const cart = await this.cartService.getCart(userId);
    return cart;
  }
}
