import { Body, Controller, Delete, Get, HttpCode, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateReviewDto, @Req() req: any) {
    return this.reviewService.createComment(+dto.productId, dto.description, req.user.emailOrSteamdId);
  }

  @Get()
  async getAllReviews(@Query() dto: Omit<CreateReviewDto, 'description'>) {
    return this.reviewService.getReviewsByProduct(+dto.productId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('byProduct/:productId')
  // async get(@Param('productId') productId: string, @UserData() data: string) {

  //   return { hello: 'world' };
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {

  // }


}
