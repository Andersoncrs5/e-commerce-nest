import { Test, TestingModule } from '@nestjs/testing';
import { DiscountCouponsController } from './discount_coupons.controller';
import { DiscountCouponsService } from './discount_coupons.service';

describe('DiscountCouponsController', () => {
  let controller: DiscountCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountCouponsController],
      providers: [DiscountCouponsService],
    }).compile();

    controller = module.get<DiscountCouponsController>(DiscountCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
