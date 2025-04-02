import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";

export class CreateProductDto {
    @IsOptional()
    @IsString()
    id: string

    @IsString({ message: "The field name should be a string" })
    @IsNotEmpty({ message: "The field name cannot be null" })
    @Length(1, 150, { message: "The max length of name is 150 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    name: string;

    @IsOptional()
    @IsString({ message: "The field image should be a string" })
    @Length(1, 300, { message: "The max length of image is 300 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    image: string;

    @IsString({ message: "The field content should be a string" })
    @IsNotEmpty({ message: "The field content cannot be null" })
    @Length(1, 4000, { message: "The max length of content is 4000 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    content: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 0 })
    quantity: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: false })
    is_active: boolean

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 0 })
    unique_code: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 0.0 })
    price: number;

    @IsNotEmpty()
    @ApiProperty({ example: 0 })
    @IsNumber()
    category_id: number;

}
