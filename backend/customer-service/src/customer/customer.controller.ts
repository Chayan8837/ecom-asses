import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('register')
    async register(@Body() body: { name: string; phone: string; email: string; password: string }) {
        return this.customerService.register(body.name, body.phone, body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { identifier: string; password: string }) {
        try {
          return await this.customerService.login(body.identifier, body.password);
        } catch (error) {
          return { statusCode: 400, message: error.message };
        }
      }

    @Post('address')
    async addAddress(@Body() body: { userId: number; address: string }) {
        return this.customerService.addAddress(body.userId, body.address);
    }

    @Put('address/:id')
    async modifyAddress(@Param('id') id: string, @Body() body: { address: string }) {
        return this.customerService.modifyAddress(+id, body.address);
    }

    @Delete('user/:id')
    async deleteUser(@Param('id') id: string) {
        return this.customerService.deleteUser(+id);
    }

    @Get('addresses/:userId')
    async getAddresses(@Param('userId') userId: number) {
        return this.customerService.getAddresses(userId);
    }
}
