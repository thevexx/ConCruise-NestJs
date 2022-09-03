import { InjectRepository } from '@nestjs/typeorm';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import { Customer } from '../customer/customer.entity';
import { Repository } from 'typeorm';
import { Driver } from '../driver/driver.entity';

@Command({
  name: 'ConCruise',
  options: { isDefault: true }
})
export class ConsoleService extends CommandRunner {
  constructor(private readonly inquirer: InquirerService,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
  ) {
    super();
  }

  async run(inputs: string[], options?: Record<string, any>): Promise<void> {
    await this.getHelp();

    let command = inputs[0];

    while (command != 'exit') {
      command = (
        await this.inquirer.ask<{ command: string }>(
          'command-question',
          {}
        )
      ).command;

      switch (command) {
        case 'exit':
          command = 'exit'
          break;
        case 'customer':
          command = ''
          await this.getCustomers()
          break;

        case 'cruiser':
          command = ''
          await this.getDrivers()
          break;

        case 'match':
          command = ''
          await this.getMatch()
          break;

        case 'manual':
          command = ''
          await this.getHelp()
          break;

        default:
          command = '';
          break;
      }

    }

    return Promise.resolve();
  }

  async getCustomers(): Promise<string> {
    const customers = await this.customerRepository.find();
    console.table(customers);
    return Promise.resolve('done');
  }

  async getDrivers(): Promise<string> {
    const drivers = await this.driverRepository.find();
    console.table(drivers);
    return Promise.resolve('done');
  }

  toRad(value: number) {
    return value * Math.PI / 180;
  }

  calcCrow(lat1, lon1, lat2, lon2) {
    let r = 6371;
    let dLat = this.toRad(lat2 - lat1);
    let dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = r * c;
    return d;
  }

  getScore(customer, driver) {
    let score = 0;
    let distance = this.calcCrow(customer.latitude, customer.longitude, driver.latitude, driver.longitude);
    // distance = distance / 1000;
    distance = Math.round(distance);
    if (distance < 3) {
      score += 7;
    } else if (distance < 5) {
      score += 3;
    }
    if (customer.rating >= driver.rating) {
      score += 2;
    }
    if (customer.rides <= 2 && driver.rides >= 3) {
      score += 5;
    } else if (customer.rides > 2 && driver.rides < 3) {
      score += 2;
    }
    return score;
  }


  async getMatch(): Promise<string> {
    const drivers = await this.driverRepository.find();
    const customers = await this.customerRepository.find();
    let results = [];
    let customersIds = [];
    let driversIds = [];

    const threshold = 1;

    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < drivers.length; j++) {
        let score = this.getScore(customers[i], drivers[j]);
        if (score >= threshold) {
          results.push({ customer: customers[i].name, driver: drivers[j].name, score: score });
          customersIds.push(customers[i].id);
          driversIds.push(drivers[j].id);
          break;
        }
      }
    }

    console.log('Matching customers with drivers');

    console.table(results);

    let notMatchedCustomers = customers.filter((customer) => {
      return !customersIds.includes(customer.id);
    });

    let notMatchedDrivers = drivers.filter((driver) => {
      return !customersIds.includes(driver.id);
    });

    if (notMatchedCustomers.length > 0) {
      console.log('failed fulfilment customers');
      console.table(notMatchedCustomers);
    }

    if (notMatchedDrivers.length > 0) {
      console.log('idle drivers');
      console.table(notMatchedDrivers);
    }

    return Promise.resolve('done');
  }

  async getHelp(): Promise<string> {

    console.log(`Usage: npm run console [command]

commands: 

customer      Show existing list of customers

cruiser       Show existing list of cruisers

match         - Show each customer and assigned driver
              - List of failed fulfilment customers if any exists.
              - List of idle drivers if any exist.

manual        Show this help.

exit          Kill the CLI(and the rest of the application)

`);
    return Promise.resolve('done');
  }
}
