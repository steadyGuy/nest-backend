import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/auth/user.entity';
import { OrderEntity } from 'src/order/order.entity';
import { AccountEntity } from 'src/product/account.entity';
import { KeyEntity } from 'src/product/key.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { CaseEntity } from './case.entity';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(CaseEntity)
    private readonly caseRepository: Repository<CaseEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }


  async getAllCases(): Promise<any> {
    const cases = await this.caseRepository.find();

    return cases;
  }

  async getAllCasesOrdered(): Promise<any> {
    // const cases = await this.caseRepository.find();
    const orders = await this.orderRepository.find({ relations: ['product'], take: 8, order: { id: 'DESC' } });

    return orders.map((o) => {
      return {
        id: o.id, photo: o.product.photo, created_at: o.created_at, title: o.product.title, slug: o.product.slug
      };
    });
  }

  async getAllCasesItems(): Promise<any> {
    // const cases = await this.caseRepository.find();
    const products = await this.productRepository.find({
      loadRelationIds: {
        relations: ['case'],
      }
    });

    return products;
  }

}


