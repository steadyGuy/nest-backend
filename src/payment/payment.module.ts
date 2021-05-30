import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { KeyEntity } from 'src/product/key.entity';
import { ProductEntity } from 'src/product/product.entity';
import { OrderEntity } from 'src/order/order.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AccountEntity } from 'src/product/account.entity';
// import { OrderEntity } from 'src/order/order.entity';

@Module({
  providers: [PaymentService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, KeyEntity, ProductEntity, OrderEntity, AccountEntity]),
  ],
  controllers: [PaymentController]
})
export class PaymentModule { }
