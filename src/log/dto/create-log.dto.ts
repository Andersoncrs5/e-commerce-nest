// src/log/dto/create-log.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LogType } from '../entities/log.entity';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsEnum(LogType)
  log_type: LogType;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsString()
  ip_address?: string;

  @IsOptional()
  @IsString()
  user_agent?: string;
}
