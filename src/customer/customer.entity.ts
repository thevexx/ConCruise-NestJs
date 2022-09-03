
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        name: 'latitude',
        nullable: false,
        default: '',
    })
    latitude: string;

    @Column({
        name: 'longitude',
        nullable: false,
        default: '',
    })
    longitude: string;

    @Column({
        nullable: false,
        default: 0,
    })
    rides: number;

    @Column({
        nullable: false,
        default: 0,
    })
    rating: number;
}