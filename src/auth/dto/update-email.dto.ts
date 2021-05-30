import { IsEmail, IsString } from 'class-validator';

export class UpdateEmailDto {

  @IsEmail({}, { message: 'Неверный email' })
  readonly email: string;

}