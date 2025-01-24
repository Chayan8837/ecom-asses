import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
    ) {}

    async register(name: string, phone: string, email: string, password: string) {
        // Check if the user already exists by email or phone
        const existingUser = await this.usersRepository.findOne({
            where: [{ email }, { phone }],
        });
    
        if (existingUser) {
            throw new BadRequestException('User with this email or phone number is already registered.');
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create and save the new user
        const newUser = this.usersRepository.create({ name, phone, email, password: hashedPassword });
        return this.usersRepository.save(newUser);
    }

    async login(identifier: string, password: string): Promise<{ userId: number; message: string; user: { email: string; name: string; phone: string; addresses: Address[] } }> {
        const user = await this.usersRepository.findOne({
            where: [{ email: identifier }, { phone: identifier }],
            relations: ['addresses'], 
        });
    
        if (!user) {
            throw new Error('No account found with this identifier');
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Wrong password');
        }
    
        return {
            userId: user.id,
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                addresses: user.addresses,  // Include addresses in the response
            },
        };
    }
    
    
    

    async addAddress(userId: number, address: string) {
        const newAddress = this.addressRepository.create({ userId, address });
        return this.addressRepository.save(newAddress);
    }

    async modifyAddress(id: number, address: string) {
        await this.addressRepository.update(id, { address });
        return this.addressRepository.findOne({where: { address: address}});
    }

  // customer.service.ts

async deleteUser(userId: number) {
    const result = await this.usersRepository.delete(userId);
    
    if (result.affected === 0) {
        throw new Error('User not found');
    }

    return { message: 'User deleted successfully' };
}


    async getAddresses(userId: number) {
        return this.addressRepository.find({ where: { userId } });
    }
}
