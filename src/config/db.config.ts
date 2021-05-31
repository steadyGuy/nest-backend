import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { KeyEntity } from 'src/product/key.entity';
import { ProductEntity } from 'src/product/product.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { AccountEntity } from 'src/product/account.entity';
import { PlatformEntity } from 'src/product/platform.entity';
import { CaseEntity } from 'src/case/case.entity';

export const getDbConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: 3306,
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    entities: [
      OrderEntity, KeyEntity, AccountEntity, UserEntity, ReviewEntity, ProductEntity, PlatformEntity, CaseEntity
    ],
    synchronize: false, // shouldn't be used in production - otherwise you can lose production data.
  };
};