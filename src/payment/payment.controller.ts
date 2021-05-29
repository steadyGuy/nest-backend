import { Body, Controller, HttpCode, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PopUpBalanceDto } from 'src/payment/dto/pop-up-balance.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async paymentExecution(@Body() dto: PaymentDto, @Query() query: { type: string }) {
    return this.paymentService.confirmOrder(dto.email, dto.productId, query.type);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('popup-balance')
  async addBalance(@Body() dto: PopUpBalanceDto, @Req() req: any) {
    return this.paymentService.popUpBalance(req.user.emailOrSteamdId, dto.sum);
  }
}

