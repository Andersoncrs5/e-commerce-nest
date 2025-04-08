import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateDiscountCouponDto {
  @IsString({ message: 'The field code should be a string' })
  @IsNotEmpty({ message: 'The field code cannot be null' })
  @Length(1, 100, { message: 'The max length of code is 100 and min is 1' })
  @ApiProperty({ example: '' })
  @Transform(({ value }) => sanitizeHtml(value))
  code: string;

  @IsString({ message: 'The field description should be a string' })
  @IsNotEmpty({ message: 'The field description cannot be null' })
  @Length(1, 255, { message: 'The max length of description is 255 and min is 1' })
  @ApiProperty({ example: '' })
  @Transform(({ value }) => sanitizeHtml(value))
  description: string;

  @IsNumber({}, { message: 'The field discount_percentage must be a number' })
  @Min(0.0, { message: 'The discount percentage must be at least 0.0' })
  @Max(100.0, { message: 'The discount percentage must be at most 100.0' })
  @ApiProperty({ example: 0.0 })
  discount_percentage: number;

  @IsDateString({}, { message: 'The field valid_from must be a valid ISO date string' })
  @ApiProperty({ example: '' })
  valid_from: string;

  @IsDateString({}, { message: 'The field valid_until must be a valid ISO date string' })
  @ApiProperty({ example: '' })
  valid_until: string;

  @IsOptional()
  @IsBoolean({ message: 'The field is_active must be a boolean value' })
  @ApiProperty({ example: true, required: true })
  is_active: boolean;
}
