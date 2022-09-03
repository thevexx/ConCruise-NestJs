import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateDriverDto } from './driver.dto';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Get()
    getUsers() {
        return this.driverService.get();
    }


    @Get('seed')
    seed() {
        return this.driverService.seed();
    }

    @Get('id/:id')
    findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.driverService.findUsersById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createDriver(@Body() createDriverDto: CreateDriverDto) {
        return this.driverService.createDriver(createDriverDto);
    }
}
