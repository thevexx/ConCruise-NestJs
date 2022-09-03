import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min, MinLength } from "class-validator";

export class CreateDriverDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    latitude: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    longitude: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty()
    rating: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty()
    rides: number;
}