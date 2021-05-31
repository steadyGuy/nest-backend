import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseEntity } from './case.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/order.entity';
import { CaseService } from './case.service';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  providers: [CaseService],
  imports: [
    TypeOrmModule.forFeature([CaseEntity, OrderEntity, ProductEntity]),
  ],
  controllers: [CaseController]
})
export class CaseModule { }
