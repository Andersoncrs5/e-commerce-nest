import { Test, TestingModule } from '@nestjs/testing';
import { DiscountCouponsService } from './discount_coupons.service';

describe('DiscountCouponsService', () => {
  let service: DiscountCouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountCouponsService],
    }).compile();

    service = module.get<DiscountCouponsService>(DiscountCouponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
