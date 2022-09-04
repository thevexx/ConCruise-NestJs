import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriverDto } from './driver.dto';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Get()
    getDrivers() {
        return this.driverService.get();
    }


    @Get('seed')
    seed() {
        return this.driverService.seed();
    }

    @Get('id/:id')
    findDriverById(@Param('id', ParseIntPipe) id: number) {
        return this.driverService.findDriverById(id);
    }

    @Put('edit/:id')
    @UsePipes(ValidationPipe)
    editDriverById(@Param('id', ParseIntPipe) id: number, @Body() editDriver: DriverDto) {
        return this.driverService.editDriverById(id, editDriver);
    }

    @Delete('delete')
    @UsePipes(ValidationPipe)
    deleteDriverById(@Body() ids: [number]) {
        return this.driverService.deleteDriverById(ids);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createDriver(@Body() createDriverDto: DriverDto) {
        return this.driverService.createDriver(createDriverDto);
    }
}
