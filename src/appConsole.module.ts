import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from './console/console.module';
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
    ConsoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppConsoleModule { }
