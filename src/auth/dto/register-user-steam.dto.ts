import { IsEmail, IsEmpty, IsNumber, IsString, Length } from 'class-validator';

export class RegisterUserSteamDto {

  @IsString()
  readonly steamid: string;

  @IsNumber()
  readonly balance: number;

  @IsString()
  readonly image: string;

  @IsString()
  @Length(4, 30, {
    message: 'Имя пользователя от 4 до 30 символов',
  })
  readonly username: string;

}