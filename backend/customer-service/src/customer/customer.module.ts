import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
