import { IsEmail, IsString } from 'class-validator';

export class UpdateEmailDto {

  @IsString()
  @IsEmail({}, { message: 'Неверный email' })
  readonly email: string;

}