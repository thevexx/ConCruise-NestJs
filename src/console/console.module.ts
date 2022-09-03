import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customer/customer.entity';
import { ConsoleService } from './console.service';
import { CommandQuestions } from './command-question.inquery';
import { Driver } from '../driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Driver])],
  providers: [
    ConsoleService,
    CommandQuestions,
  ],
})
export class ConsoleModule { }
