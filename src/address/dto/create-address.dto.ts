import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";

export class CreateAddressDto {

    @Length(1, 30, { message: "The max length of zip code is 150 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    @IsString({ message: "The field zip code should be a string" })
    zip_code: string;

    @IsNotEmpty({ message: "The field number house cannot be null" })
    @IsNumber()
    @ApiProperty({ example: 0 })
    @Min(1)
    number_house: number;

    @IsString({ message: "The field street should be a string" })
    @IsNotEmpty({ message: "The field street cannot be null" })
    @Length(1, 150, { message: "The max length of street is 150 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    street: string;

    @IsString({ message: "The field neighborhood should be a string" })
    @IsNotEmpty({ message: "The field neighborhood cannot be null" })
    @Length(1, 250, { message: "The max length of neighborhood is 250 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value))
    neighborhood: string;

    @IsString({ message: "The field city should be a string" })
    @IsNotEmpty({ message: "The field city cannot be null" })
    @Length(1, 250, { message: "The max length of city is 250 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value))
    city: string;

    @IsString({ message: "The field state should be a string" })
    @IsNotEmpty({ message: "The field state cannot be null" })
    @Length(1, 250, { message: "The max length of state is 250 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    state: string;

    @IsString({ message: "The field country should be a string" })
    @IsNotEmpty({ message: "The field country cannot be null" })
    @Length(1, 250, { message: "The max length of country is 250 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    country: string;

    @IsString({ message: "The field complement should be a string" })
    @IsNotEmpty({ message: "The field complement cannot be null" })
    @Length(50, 500, { message: "The max length of complement is 500 and min is 50" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    @IsOptional()
    complement: string;

}