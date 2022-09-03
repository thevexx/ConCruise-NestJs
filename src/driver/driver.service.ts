import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './driver.dto';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
    ) { }

    createDriver(createDriverDto: CreateDriverDto) {
        const newDriver = this.driverRepository.create(createDriverDto);
        return this.driverRepository.save(newDriver);
    }

    findUsersById(id: number) {
        return this.driverRepository.findOneBy({ id });
    }

    get() {
        return this.driverRepository.find();
    }

    seed() {
        const drivers = [
            {
                "name": "Kristi Enser",
                "latitude": "6.4675486",
                "longitude": "124.8060125",
                "rides": 32,
                "rating": 4
            },
            {
                "name": "Gregoor Ostrich",
                "latitude": "49.8180135",
                "longitude": "9.9637931",
                "rides": 51,
                "rating": 3
            },
            {
                "name": "Reid Blyden",
                "latitude": "24.874132",
                "longitude": "118.675675",
                "rides": 14,
                "rating": 4
            }
        ];
        return this.driverRepository.insert(drivers);
    }
}
