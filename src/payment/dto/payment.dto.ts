import { IsEmail, IsNumber, IsString } from 'class-validator';

export class PaymentDto {

  @IsNumber()
  readonly productId: number;

  @IsString()
  @IsEmail({}, { message: 'Неверный email' })
  readonly email: string;

}