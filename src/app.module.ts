import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaseItemModule } from './case-item/case-item.module';
import { getDbConfig } from './config/db.config';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDbConfig
    }),
    AuthModule,
    CaseItemModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
