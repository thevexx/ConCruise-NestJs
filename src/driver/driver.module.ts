import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './driver.controller';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]),],
  controllers: [DriverController],
  providers: [DriverService]

})
export class DriverModule { }
