import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {

  // constructor(private readonly configService: ConfigService) { }

  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, 'id'>) {
    // this.configService.get('TEST');
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async get(@Param('productId') productId: string, @UserData() data: string) {
    console.log(data);
    return { hello: 'world' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ReviewModel) {

  }

}
