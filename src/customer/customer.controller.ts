import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    getCustomers() {
        return this.customerService.get();
    }

    @Get('seed')
    seed() {
        return this.customerService.seed();
    }

    @Get('id/:id')
    findCustomerById(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.findCustomerById(id);
    }

    @Put('edit/:id')
    @UsePipes(ValidationPipe)
    editCustomerById(@Param('id', ParseIntPipe) id: number, @Body() editCustomer: CustomerDto) {
        return this.customerService.editCustomerById(id, editCustomer);
    }

    @Delete('delete')
    @UsePipes(ValidationPipe)
    deleteCustomerById(@Body() ids: [number]) {
        return this.customerService.deleteCustomerById(ids);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomer: CustomerDto) {
        return this.customerService.createCustomer(createCustomer);
    }
}
