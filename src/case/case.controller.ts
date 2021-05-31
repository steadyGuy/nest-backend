import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PopUpBalanceDto } from 'src/payment/dto/pop-up-balance.dto';
import { CaseService } from './case.service';

@Controller('cases')
export class CaseController {

  constructor(private readonly caseService: CaseService) { }

  @Get()
  async getCases() {
    return this.caseService.getAllCases();
  }

  @Get('ordered')
  async getCasesOrdered() {
    return this.caseService.getAllCasesOrdered();
  }

  @Get('all-items')
  async getAllItems() {
    return this.caseService.getAllCasesItems();
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async paymentExecution(@Body() dto: PaymentDto, @Query() query: { type: string }) {
  //   return this.paymentService.confirmOrder(dto.email, dto.productId, query.type);
  // }

  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Post('popup-balance')
  // async addBalance(@Body() dto: PopUpBalanceDto, @Req() req: any) {
  //   return this.paymentService.popUpBalance(req.user.emailOrSteamdId, dto.sum);
  // }

}

