import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/customer.entity';
import { Driver } from './driver/driver.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Customer, Driver],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    DriverModule,
    CustomerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
