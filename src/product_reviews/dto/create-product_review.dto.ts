import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProductReviewDto {
  @IsNumber()
  @Min(0.0)
  @Max(9.9)
  rating: number;

  @IsOptional()
  @IsString()
  @Max(500)
  comment?: string;
}
