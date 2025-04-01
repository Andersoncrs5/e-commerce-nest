import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import * as sanitizeHtml from "sanitize-html";

export class CreateCategoryDto {

    @IsString({ message: "The field name of category should be a string" })
    @IsNotEmpty({ message: "The field name of category cannot be null" })
    @Length(1, 200, { message: "The max length of name of category is 200 and min is 1" })
    @ApiProperty({ example: "" })
    @Transform(({ value }) => sanitizeHtml(value) )
    name: string;

}
