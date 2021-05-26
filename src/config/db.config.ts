import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { ReviewModel } from 'src/review/review.model';

export const getDbConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: 3306,
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    entities: [UserEntity, ReviewModel],
    synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
  };
};