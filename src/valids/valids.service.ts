import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidsService {
    IsNotNullId(id: number, message = 'ID must be a positive number'): void {
        if (!id || isNaN(id) || id <= 0) {
          throw new BadRequestException(message);
        }
      }
    
      IsNotNullIdAndValidUUID(id: string, message = 'Id must be a valid UUID'): void {
        if (!id || !isUUID(id)) {
          throw new BadRequestException(message);
        }
      }
    
      IsNotNullObject<T>(obj: T | null | undefined, message = 'Object not found'): T {
        if (obj == null) {
          throw new NotFoundException(message);
        }
    
        return obj;
      }
    
      IsNotEmptyString(value: string, message = 'Field must be a non-empty string'): void {
        if (typeof value !== 'string' || value.trim() === '') {
          throw new BadRequestException(message);
        }
      }
}
