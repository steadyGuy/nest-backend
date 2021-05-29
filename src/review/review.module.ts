import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/auth/user.entity';
import { getJWTConfig } from 'src/config/jwt.config';
import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, UserEntity, ProductEntity, OrderEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [ReviewService, AuthService]
})
export class ReviewModule { }
