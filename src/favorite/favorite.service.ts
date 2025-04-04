import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Favorite } from './entity/favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private readonly repository: Repository<Favorite>,
        private readonly userService: UserService,
        private readonly productService: ProductService
    ){}

    async save(userId: number, productId: string) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const user: User = await this.userService.findOne(userId);
            const product: Product = await this.productService.findOne(productId);

            const data = { user, product }
    
            await queryRunner.manager.save(data);
            await queryRunner.commitTransaction();
        
            return 'Product created';
        } catch (error) {
            await queryRunner.rollbackTransaction();    
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }
    }

    async check(userId: number, productId: string): Promise<boolean> {
        const user: User = await this.userService.findOne(userId);
        const product: Product = await this.productService.findOne(productId);

        const check: boolean = await this.repository.exists({
            where: {
                user,
                product
            }
        })

        return check
    }

    async remove(userId: number, productId: string) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const user: User = await this.userService.findOne(userId);
            const product: Product = await this.productService.findOne(productId);

            const check = await this.repository.findOne({
                where: {
                    user,
                    product
                }
            })
    
            await queryRunner.manager.delete(Favorite, check);
            await queryRunner.commitTransaction();
        
            return 'Favorite removed!!';
        } catch (error) {
            await queryRunner.rollbackTransaction();    
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }
    }

    async findAllByUser(userId: number): Promise<Favorite[]>{
        const user: User = await this.userService.findOne(userId);

        const favorites: Favorite[] = await this.repository.find({
            where:{
                user
            }
        });

        return favorites;
    }

}
