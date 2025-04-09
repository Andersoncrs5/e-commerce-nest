import { IsEnum, IsNotEmpty, IsOptional, IsString, Max } from "class-validator";
import { ShippingStatus } from "../entities/shipping.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateShippingDto {

    @IsString()
    @IsNotEmpty()
    @Max(100)
    @ApiProperty({ example: '' })
    shippingMethod: string;

    @IsString()
    @IsOptional()
    @Max(100)
    @ApiProperty({ example: '' })
    trackingNumber: string;

    @IsNotEmpty()
    @IsEnum(ShippingStatus, { message: 'Invalid sale_status value' })
    @ApiProperty({ enum: ShippingStatus, example: ShippingStatus.PENDING_PAYMENT })
    status: ShippingStatus;
}