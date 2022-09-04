import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    ) { }

    createCustomer(createCustomer: CustomerDto) {
        const newCustomer = this.customerRepository.create(createCustomer);
        return this.customerRepository.save(newCustomer);
    }

    findCustomerById(id: number) {
        return this.customerRepository.findOneBy({ id });
    }

    editCustomerById(id: number, editCustomer: CustomerDto) {
        return this.customerRepository.update({ id }, editCustomer);
    }

    deleteCustomerById(id: [number]) {
        return this.customerRepository.delete(id);
    }

    get() {
        return this.customerRepository.find();
    }

    seed() {
        const customers = [
            {
                "name": "Sybyl Coxwell",
                "latitude": "67.1356306",
                "longitude": "20.6831751",
                "rides": 35,
                "rating": 3
            },
            {
                "name": "Carolus Boddis",
                "latitude": "27.950753",
                "longitude": "109.592921",
                "rides": 99,
                "rating": 3
            },
            {
                "name": "Sunny Beak",
                "latitude": "55.813957",
                "longitude": "37.626119",
                "rides": 52,
                "rating": 3
            },
            {
                "name": "Cory Crudge",
                "latitude": "22.791223",
                "longitude": "110.454459",
                "rides": 18,
                "rating": 3
            }
        ]
        return this.customerRepository.insert(customers);
    }
}
