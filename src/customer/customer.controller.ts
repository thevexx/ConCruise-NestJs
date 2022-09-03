import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    getUsers() {
        return this.customerService.get();
    }

    @Get('seed')
    seed() {
        return this.customerService.seed();
    }

    @Get('id/:id')
    findUsersById(@Param('id', ParseIntPipe) id: number) {        
        return this.customerService.findUsersById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUsers(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }
}
 