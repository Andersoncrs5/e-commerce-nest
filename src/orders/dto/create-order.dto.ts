import { IsEnum, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { SaleStatus, ShippingStatus } from '../entities/order.entity';

export class CreateOrderDto {

  @IsNumber({}, { message: 'The field quantity must be a number' })
  @IsNotEmpty()
  @Min(1, { message: 'The quantity must be at least 1' })
  @ApiProperty({ example: 0 })
  quantity: number;

  @IsNumber({}, { message: 'The field value must be a number' })
  @IsNotEmpty()
  @IsPositive({ message: 'The value must be a positive number' })
  @ApiProperty({ example: 0.0 })
  value: number;

  @IsEnum(SaleStatus, { message: 'Invalid sale_status value' })
  @ApiProperty({ enum: SaleStatus, example: SaleStatus.PENDING_PAYMENT })
  @IsNotEmpty()
  sale_status: SaleStatus;

  @IsEnum(ShippingStatus, { message: 'Invalid shipping_status value' })
  @ApiProperty({ enum: ShippingStatus, example: ShippingStatus.PENDING_PAYMENT })
  @IsNotEmpty()
  shipping_status: ShippingStatus;
}
